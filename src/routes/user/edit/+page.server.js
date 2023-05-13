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
                where: {
                    userId: userId
                }
                
            }
        )
        if (!profile) {
            return {
                // profile,
                newUser: true
            }  
        }
        return {profile}
    }
    
};

/**@type {import('./$types').Actions} */
export const actions = {
    new: async (event) => {
        const data = await event.request.formData()

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
                    userId: user,
                    linkName: data.get("linkName"),
                    email: user.email,
                    name: user.name,
                    image: user.image,
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
