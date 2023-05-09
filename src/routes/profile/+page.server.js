/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const session = await event.locals.getSession()
    let isSession;
    session ? isSession = true : isSession = false
    return {
        isSession
    }
}