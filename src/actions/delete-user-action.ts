"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { revalidatePath } from "next/cache"


export async function deleteUserAction({ userId }: { userId: string }) {
    const headersList = await headers()

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) throw new Error("Unauthorized User")

    if (session.user.role !== "ADMIN") {
        throw new Error("Forbidden User")
    }
    try {

        await prisma.user.delete({
            where: {
                id: userId,
                OR: [
                    { role: "USER" },
                    { role: "ARENAMASTER" },
                    { role: "ADMIN" }
                ]
            }
        })
        if (session.user.id === userId) {
            await auth.api.signOut({
                headers: headersList //AWAIT function is headerslist
            });
            redirect("/auth/login")
        }
        revalidatePath("/admin/dashboard")
        return {
            error: null
        }
    } catch (err) {
        if (isRedirectError(err)) {
            throw err;
        }

        if (err instanceof Error) {
            return {
                error: err.message
            }
        } else {
            return {
                error: "Internal Server Error"
            }
        }
    }

}