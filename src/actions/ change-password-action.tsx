"use server"
import { APIError } from "better-auth/api"
import { auth } from "@/lib/auth"
import { headers } from "next/headers";

export async function changePasswordAction(formData: FormData) {
    const currentPassword = String(formData.get("currentPassword"));
    const newPassword = String(formData.get("newPassword"));
    const confirmPassword = String(formData.get("confirmPassword"))
    // if (!currentPassword) {
    //     return { error: "Please enter your current password. " }
    // }
    if (!newPassword) {
        return { error: "Please enter the new password." }
    }
    if (!confirmPassword) {
        return { error: "Please confirm the password." }
    }

    if (confirmPassword !== newPassword) {
        return { error: "Password do not match" }
    }

    try {
        await auth.api.changePassword({
            headers: await headers(),
            body: {
                currentPassword: currentPassword,
                newPassword: newPassword
            }
        })
        return { error: null }
    } catch (error) {
        if (error instanceof APIError) {
            return { error: error.message }
        }
        return { error: "Internal Server Error!" }
    }
}