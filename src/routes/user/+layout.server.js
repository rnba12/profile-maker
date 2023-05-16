import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma.js';
import { getIdFromSession } from '$lib/server/helpers.js'

/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) {
    const session = await event.locals.getSession()
    if (!session) {
        throw redirect(303, '/')
    }
    const userId = await getIdFromSession(event.cookies.get("__Secure-next-auth.session-token"))
    const linkName = await prisma.profile.findUnique({
        where: { userId: userId},
        select: { linkName: true}
    })
    return {
        linkName
    };
};
