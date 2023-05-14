import {PrismaClient} from '@prisma/client'
import { error } from '@sveltejs/kit';

const prisma = new PrismaClient()

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const session = await event.locals.getSession()
    let isSession;
    session ? isSession = true : isSession = false
    
    const getProfile = await prisma.profile.findUnique({
        where: {
            linkName: event.params.id
        },
        select: {
            linkName: true,
            name: true,
            email: true,
            tagline: true,
            image: true,
            links: true,
            stack: true,
        },
        
    })

    if (!getProfile) {
        
        throw error(404, 'Not Found')
    } else {
        const getProjects = await prisma.project.findMany({
            where: {profileId: getProfile.id },
            select: {
                title: true,
                description: true,
                url: true,
                stack: true,
            }
        })
        delete getProfile["id"]

        return {
        getProfile,
        getProjects,
        isSession
    } 
    }
}
