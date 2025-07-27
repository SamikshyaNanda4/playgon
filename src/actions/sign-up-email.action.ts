"use server"
import { auth, ErrorCode } from "@/lib/auth"
import { APIError } from "better-auth/api"

export async function signUpEmailAction(formData: FormData) {
    const name = String(formData.get("name"))
    const email = String(formData.get("email"))
    const password = String(formData.get("password"))

    if (!name) return { error: "Please enter your name." }
    if (!email) return { error: "Please enter your email." }
    if (!password) return { error: "Please enter your password." }

    try {
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password
            }
        })
        return { error: null };

    } catch (err) {
        if (err instanceof APIError) {
            const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN"
            // return { error: err.message }
            switch (errCode) {
                default: return {
                    error: err.message
                }
            }
        }
        return { error: "Internal Server Error!!!" }
    }
}