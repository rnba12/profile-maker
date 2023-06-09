/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) {
    const session = await event.locals.getSession()
    if (session) {
        return {session}
    };
};
