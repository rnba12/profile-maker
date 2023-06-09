import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma.js';
import { getIdFromSession, getCookies } from '$lib/server/helpers.js';
import { redirect } from '@sveltejs/kit';

let userId;

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const token = await event.cookies.get(getCookies())
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

        const newLinkName = data.get("linkName").trim()

        if (newLinkName.length < 3) {
            return fail(400,{
                error: true,
                message: "Link name must be longer than 3 characters"
            }) 
        }

        if ((/\s/).test(newLinkName)) {
            return fail(400,{
                error: true,
                message: "Link name cannot contain spaces"
            })
        }

        const nameExists = await prisma.profile.findUnique({
            where:{ linkName: newLinkName},
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
                        "GitHub": "",
                        "LinkedIn": "",
                        "Twitter": "",
                        "Dribbble": "",
                        "Instagram": "",
                        "Facebook": "",
                        "Discord": ""
                    },
                    stack: []
                }
            })
            throw redirect(301, '/user/edit')
        }
    }
}
