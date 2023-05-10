import { redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
let profileId;

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const session = await event.locals.getSession()
    if (!session) {
        throw redirect(304, '/')
    } else {
        const user = await prisma.user.findUnique({where: {email: session.user.email}})
        let profile = await prisma.profile.findUnique(
            {
                where: {
                    userId: user.id
                },
                include: {
                    projects: true
                }
                
            }
        )
        // if (!projects) {
        //     profile = await prisma.profile.create({
        //         data: {
        //             userId: user.id,
        //             name: user.name,
        //             image: user.image,
        //             links: {
        //                 "github": "",
        //                 "linkedin": "",
        //                 "twitter": ""
        //             },
        //             stack: []
        //         }
        //     })
        //     return {
        //         profile,
        //         newUser: true
        //     }  
        // }
        prisma.$disconnect
        profileId = profile.id
        return {projects: profile.projects}
    }
    
};

/**@type {import('./$types').Actions} */
export const actions = {
    add: async (event) => {
        const data = await event.request.formData()

        const newProject = await prisma.project.create({
            data: {
                profileId: profileId,
                title: data.get("title"),
                url: data.get("url"),
                description: data.get("description"),
                stack: data.get("stack").split(","),
            }
        })
    
        return { success: true}
    },

    update: async (event) => {
        const data = await event.request.formData()
        console.log(data)
    
        return { success: true}
    }
}
