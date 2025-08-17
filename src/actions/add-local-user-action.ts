import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth"
import { superRefine } from "better-auth";


export async function addLocalUser(id: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    if (!user) {
        return { error: "User not found!" }
    }

    const result = await prisma.userLocal.create({
        data: {
            username: user?.name,
            authId: user?.id,
            role: user?.role
        }
    })

    return { error: null }
}