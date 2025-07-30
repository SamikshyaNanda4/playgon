"use client"

import { ButtonWithLoader } from "./button-with-loader"
import { signOut } from "@/lib/auth.client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState } from "react"


export const SignOutButton = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function handleClick() {
        await signOut({
            fetchOptions: {
                onRequest: () => {
                    setIsLoading(true)
                },
                onResponse: () => {
                    setIsLoading(false)
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message || "Logout  failed!")
                },
                onSuccess: () => {
                    toast.warning("You have logged out! See you soon.")
                    router.push("/auth/login")
                }
            }
        })
    }

    return (
        <>
            <div className="mx-3.5 my-3.5">
                <ButtonWithLoader
                    onClick={handleClick}
                    variant="destructive"
                    size="sm"
                    className="cursor-pointer"
                    isLoading={isLoading}
                >
                    Sign Out
                </ButtonWithLoader>
            </div>
        </>
    )
}