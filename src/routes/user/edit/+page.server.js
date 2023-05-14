import { redirect, fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma.js';
import { getIdFromSession } from '$lib/server/helpers';

let userId;

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const session = await event.locals.getSession()
    const token = await event.cookies.get("next-auth.session-token")

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
            return { newUser: true }  
        }
        return { profile }
    }   
};

/**@type {import('./$types').Actions} */
export const actions = {
    new: async (event) => {
        const data = await event.request.formData()
        const session = await event.locals.getSession()

        const nameExists = await prisma.profile.findUnique({
            where:{ linkName: data.get("linkName")},
            select: { linkName: true }
        })

        if (nameExists) {
            // return name not available
            return fail(400,{
                error: true,
                message: "Link name is not available."
            })
        }
        else {
            const newProfile = await prisma.profile.create({
                data: {
                    userId: userId,
                    linkName: data.get("linkName"),
                    email: session.user.email,
                    name: session.user.name,
                    image: session.user.image,
                    tagline: "",
                    links: {
                        "github": "",
                        "linkedin": "",
                        "twitter": ""
                    },
                    stack: []
                }
            })
            return {success: true}
        }
    }
}
