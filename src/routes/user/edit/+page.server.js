import { redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

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
                }
                
            }
        )
        if (!profile) {
            profile = await prisma.profile.create({
                data: {
                    userId: user.id,
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
        }  
        prisma.$disconnect
        return {profile}
    }
    
};
