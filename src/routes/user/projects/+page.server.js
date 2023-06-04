import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import { getIdFromSession, getCookies } from '$lib/server/helpers';

let profileId;

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const session = await event.locals.getSession()
    const token = await event.cookies.get(getCookies())

    if (!session) {
        throw redirect(304, '/')
    } else {
        const userId = await getIdFromSession(token)
        let profile = await prisma.profile.findUnique(
            {
                where: { userId: userId },
                include: { projects: true }
            }
        )
        profile.projects.forEach(p => delete p.profileId)
        profileId = profile.id
        return { projects: profile.projects }
    }
};

/**@type {import('./$types').Actions} */
export const actions = {
    add: async (event) => {
        const data = await event.request.formData()
        let stack = data.get("stack").split(",")
        if (stack[0] === '') stack = [] 

        const newProject = await prisma.project.create({
            data: {
                profileId: profileId,
                title: data.get("title"),
                url: data.get("url"),
                description: data.get("description"),
                stack: stack
            }
        })
        return { 
            success: true,
            message: "Added New Project" 
        }
    },

    update: async (event) => {
        const data = await event.request.formData()
        
        const getProfileId = await prisma.project.findUnique({
            where: { id: data.get("id") },
            select: {profileId: true}
        })
        
        if (getProfileId.profileId !== profileId) {
            return fail(401, {
                error: true, message: "Unauthorised delete"
            })
        } 

        let stack = data.get("stack").split(",")
        if (stack[0] === '') stack = []
        
        const updateProject = await prisma.project.update({
            where: { id: data.get("id") },
            data: {
                title: data.get("title"),
                url: data.get("url"),
                description: data.get("description"),
                stack: stack
            }
        })
        return { 
            success: true,
            message: "Updated Project" 
        }
    },

    delete: async ({ url }) => {
        const data = await url.searchParams.get("id")

        const getProfileId = await prisma.project.findUnique({
            where: { id: data },
            select: {profileId: true}
        })
        
        if (getProfileId.profileId !== profileId) {
            return fail(401, {
                error: true, message: "Unauthorised delete"
            })
        } 

        const deleteProject = await prisma.project.delete({
            where: { id: data }
        })
        return { 
            success: true,
            message: "Deleted Project" 
        }
    }
}
