"use server"
import { auth, ErrorCode } from "@/lib/auth"
import { headers } from "next/headers"
import { APIError } from "better-auth/api"
import { redirect } from "next/navigation"


export async function signInEmailAction(formData: FormData) {

    const email = String(formData.get("email"))
    const password = String(formData.get("password"))

    if (!email) return { error: "Please enter your email." }
    if (!password) return { error: "Please enter your password." }

    try {
        await auth.api.signInEmail({
            headers: await headers(),
            body: {
                email,
                password
            },
        })
        //====
        //         const setCookieHeader = res.headers.get("set-cookie")
        //         if (setCookieHeader) {
        //             const cookie = parseSetCookieHeader(setCookieHeader);
        //             const cookieStore = await cookies();
        // 
        //             const [key, cookieAttributes] = [...cookie.entries()][0]
        //             const value = cookieAttributes.value;
        //             const maxAge = cookieAttributes["max-age"];
        //             const path = cookieAttributes.path;
        //             const httpOnly = cookieAttributes.httponly;
        //             const sameSite = cookieAttributes.samesite;
        // 
        //             cookieStore.set(key, decodeURIComponent(value), {
        //                 maxAge,
        //                 path,
        //                 httpOnly,
        //                 sameSite
        //             })
        //         }
        //====
        return { error: null };

    } catch (err) {
        if (err instanceof APIError) {
            const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN"
            switch (errCode) {
                case "EMAIL_NOT_VERIFIED":
                    redirect("/auth/verify?error=email_not_verified")
                default: return {
                    error: err.message
                }
            }
        }
        return { error: "Internal Server Error!!!" }
    }
}