"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { email } from "better-auth"
import { signUp } from "@/lib/auth.client"
import { useRouter } from "next/navigation"

export const RegisterForm = () => {
    const router = useRouter();
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement);
        const name = String(formData.get("name"))
        const email = String(formData.get("email"))
        const password = String(formData.get("password"))

        if (!name) return toast.error("Please enter your name")
        if (!email) return toast.error("Please enter your email")
        if (!password) return toast.error("Please enter your password")

        console.log({ name, email, password })

        await signUp.email(
            {
                name,
                email,
                password
            },
            {
                onRequest: () => { },
                onResponse: () => { },
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                },
                onSuccess: () => {
                    router.push("/profile")
                },
            }

        )

    }


    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" id="name" name="name" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input type="email" id="email" name="email" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" name="password" />
                </div>
                <Button type="submit" className="w-full cursor-pointer" variant="default" >
                    Register
                </Button>

            </form>

        </>
    )
}