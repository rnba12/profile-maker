import { prisma } from '$lib/server/prisma.js';
import { getIdFromSession } from '$lib/server/helpers.js';
import { redirect } from '@sveltejs/kit';

let userId;

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const token = await event.cookies.get("next-auth.session-token")
    userId = await getIdFromSession(token)
    const profile = await prisma.profile.findUnique({
        where: {userId: userId}, select: {id: true}
    })

    if (profile) {
        throw redirect(301, '/user/edit')
    } else {
        return {};
    }
};

/**@type {import('./$types').Actions} */
export const actions = {
    default: async(event) => {
        const data = await event.request.formData()
        const session = await event.locals.getSession()

        const nameExists = await prisma.profile.findUnique({
            where:{ linkName: data.get("linkName")},
            select: { linkName: true }
        })

        if (nameExists) {
            // return name not available
            return fail(400,{
                error: true,
                message: "Link name is not available."
            })
        }
        else {
            const newProfile = await prisma.profile.create({
                data: {
                    userId: userId,
                    linkName: data.get("linkName"),
                    email: session.user.email,
                    name: session.user.name,
                    image: session.user.image,
                    tagline: "",
                    links: {
                        "github": "",
                        "linkedin": "",
                        "twitter": ""
                    },
                    stack: []
                }
            })
            throw redirect(301, '/user/edit')
        }
    }
}
