"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth.client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


export const SignOutButton = () => {
    const router = useRouter()

    async function handleClick() {
        await signOut({
            fetchOptions: {
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                },
                onSuccess: () => {
                    router.push("/auth/login")
                }
            }
        })
    }

    return (
        <>
            <div className="mx-3.5 my-3.5">
                <Button onClick={handleClick} size="sm" variant="destructive" className="cursor-pointer">
                    Sign Out
                </Button></div>
        </>
    )
}