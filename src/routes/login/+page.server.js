import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const session = await event.locals.getSession()
    if (session) {
        throw redirect(303, '/welcome')
    }
    return {
        session
    };
};
