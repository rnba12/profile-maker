import { json } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma'
import { getIdFromSession } from '$lib/server/helpers';


/** @type {import('./$types').RequestHandler} */
export async function POST(requestEvent) {
    // save profile
    const { request, cookies } = requestEvent;
    const token = await cookies.get("next-auth.session-token")
    const data = await request.json()

    const userId = await getIdFromSession(token) 
    
    const updateProfile = await prisma.profile.update({
        where: {
            userId: userId
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
