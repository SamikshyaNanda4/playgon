"use server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"


export async function addGamerName(formData: FormData) {
    const gameName = String(formData.get("gameName"))
    if (!gameName) {
        return { error: "Game name required!" }
    }

    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        const userLocal = await prisma.userLocal.update({
            where: {
                authId: session?.user.id
            },
            data: {
                IGN: gameName
            }
        })
        return { error: null }
    } catch (error) {
        return { error: "user not found ! or game name is unable to get updated" }
    }
}