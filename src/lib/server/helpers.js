import { prisma } from '$lib/server/prisma.js'

const getIdFromSession = async (token) => {
    const {user} = await prisma.session.findUnique({where: {sessionToken: token}, select: {user: true}})
    return user.id
}

export {getIdFromSession}
