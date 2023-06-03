import { redirect, fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma.js';
import { getIdFromSession, getCookies } from '$lib/server/helpers';

let userId;

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const session = await event.locals.getSession()
    const token = await event.cookies.get(getCookies())

    if (!session) {
        throw redirect(304, '/')
    } else {
        userId = await getIdFromSession(token)
        let profile = await prisma.profile.findUnique(
            {
                where: { userId: userId },
                select: {
                    name: true,
                    tagline: true,
                    links: true,
                    stack: true,
                    image: true
                }           
            }
        )
        
        if (!profile) {
            throw redirect(301, '/welcome') 
        }
        return { profile }
    }   
};

/**@type {import('./$types').Actions} */
export const actions = {
    bio: async (event) => {
        const data = await event.request.formData()

        const updateBio = await prisma.profile.update({
            where: {userId: userId},
            data: {
                name: data.get("name"),
                tagline: data.get("tagline")
            }
        })
        return {message: "Bio Updated"}
    }
}
