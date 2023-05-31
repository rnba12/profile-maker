import { prisma } from '$lib/server/prisma.js'

const getIdFromSession = async (token) => {
    const {user} = await prisma.session.findUnique({where: {sessionToken: token}, select: {user: true}})
    return user.id
}


const getCookies = () => {
    if (process.env.NODE_ENV === "development") {
        return "next-auth.session-token"
    } else {
        return "__Secure-next-auth.session-token"
    }
}

export {getIdFromSession, getCookies}
