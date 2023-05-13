import { redirect, fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma.js';

let user;

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const session = await event.locals.getSession()
    if (!session) {
        throw redirect(304, '/')
    } else {
        user = await prisma.user.findUnique({where: {email: session.user.email}})
        let profile = await prisma.profile.findUnique(
            {
                where: {
                    userId: user.id
                }
                
            }
        )
        if (!profile) {
            return {
                // profile,
                newUser: true
            }  
        }
        prisma.$disconnect
        return {profile}
    }
    
};

/**@type {import('./$types').Actions} */
export const actions = {
    new: async (event) => {
        const data = await event.request.formData()

        const nameExists = await prisma.profile.findUnique({
            where:{ linkName: data.get("linkName")},
            select: { linkName: true}
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
                    userId: user.id,
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
