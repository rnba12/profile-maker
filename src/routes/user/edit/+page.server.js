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
