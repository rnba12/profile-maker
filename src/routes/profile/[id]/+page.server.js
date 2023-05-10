import {PrismaClient} from '@prisma/client'
import { error } from '@sveltejs/kit';

const prisma = new PrismaClient()

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const session = await event.locals.getSession()
    let isSession;
    session ? isSession = true : isSession = false
    console.log(event.params.id)
    const getProfile = await prisma.profile.findUnique({
        where: {
            id: event.params.id
        }
    })

    if (!getProfile) {
        throw error(404, 'Not Found')
    } else return {
        getProfile,
        isSession
    }
}
