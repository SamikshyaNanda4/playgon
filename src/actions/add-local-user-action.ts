import { prisma } from "@/lib/prisma";


export async function addLocalUser(id: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    if (!user) {
        return { error: "User not found!" }
    }

    await prisma.userLocal.create({
        data: {
            username: user?.name,
            authId: user?.id,
            role: user?.role
        }
    })

    return { error: null }
}