import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma.js';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const session = await event.locals.getSession()
    if (!session) {
        throw redirect(304, '/')
    } else {
        const user = await prisma.user.findUnique({where: {email: session.user.email}})
        const profile = await prisma.profile.findUnique({
            where: {userId: user.id},
            select: {
                id: true,
                linkName: true
            }
        }) 

        return {profile}
    }
};

/**@type {import('./$types').Actions} */
export const actions = {
    editLink: async (event) => {
        const data = await event.request.formData()
        const profileId = await event.url.searchParams.get("id")

        const nameExists = await prisma.profile.findUnique({
            where:{ linkName: data.get("linkName")},
            select: { linkName: true }
        })


        if (nameExists) {
            // return name not available
            return fail(400,{
                error: true,
                message: "Link name in use."
            })
        }
        else {
            const updateLink = await prisma.profile.update({
                where: {id: profileId},
                data: {
                    linkName: data.get("linkName")
                }
            })

            return { success: true }
        }
    },

    deleteAccount: async (event) => {

    }

}
