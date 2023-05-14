import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma.js';
import { getIdFromSession } from '$lib/server/helpers';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const session = await event.locals.getSession()
    const token = await event.cookies.get("next-auth.session-token")
    if (!session) {
        throw redirect(304, '/')
    } else {
        const userId = await getIdFromSession(token)

        const profile = await prisma.profile.findUnique({
            where: { userId: userId },
            select: { linkName: true }
        }) 

        return {profile}
    }
};

/**@type {import('./$types').Actions} */
export const actions = {
    editLink: async (event) => {
        const userId = await getIdFromSession(event.cookies.get("next-auth.session-token"))
        const data = await event.request.formData()

        const {id} = await prisma.profile.findUnique({
            where: {userId: userId},
            select: {id: true}
        }) 

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
                where: {id: id},
                data: { linkName: data.get("linkName") }
            })

            return { success: true, message: "Link Updated Successfully" }
        }
    },

    deleteAccount: async (event) => {
        const token = await event.cookies.get("next-auth.session-token")
        const id = await getIdFromSession(token)

        if (!id) {
            return fail(400, {
                error: true,
                message: "Request Failed"
            })
        }
        
        const deleteUser = await prisma.user.delete({
            where: { id: id }
        })

        throw redirect(303, '/')
    }

}
