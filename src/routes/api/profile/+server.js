import { json } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma'


/** @type {import('./$types').RequestHandler} */
export async function POST(requestEvent) {
    // save profile
    const { request } = requestEvent;
    const data = await request.json()
    
    const updateProfile = await prisma.profile.update({
        where: {
            id: data.id
        },
        data: {
            name: data.name,
            tagline: data.tagline,
            image: data.imgae,
            links: data.links,
            stack: data.stack
        }
    })
    prisma.$disconnect

    return json({success: true})
}
