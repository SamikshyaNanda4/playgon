"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signInEmailAction } from "@/actions/sign-in-email-action"
import { ButtonWithLoader } from "./button-with-loader"
import { useState } from "react"
import Link from "next/link"

export const LoginForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        const formData = new FormData(event.target as HTMLFormElement);
        const { error } = await signInEmailAction(formData)
        if (error) {
            toast.error(error)
            setIsLoading(false)
        } else {
            toast.success("Login Successful!")
            setIsLoading(false)
            router.push("/profile")

        }
        // 
        //         await signUp.email(
        //             {
        //                 email,
        //                 password
        //             },
        //             {
        //                 onRequest: () => {
        //                     setIsLoading(true)
        //                 },
        //                 onResponse: () => {
        //                     setIsLoading(false)
        //                 },
        //                 onError: (ctx) => {
        //                     toast.error(ctx.error.message)
        //                 },
        //                 onSuccess: () => {
        //                     toast.success("User successfully registered!")
        //                     router.push("/profile")
        //                 },
        //             }
        // 
        //         )

    }


    return (
        <>
            <div className="mt-4 mb-2">
                <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
                    {/* <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" id="name" name="name" />
                </div> */}

                    <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input type="email" id="email" name="email" />
                    </div>

                    <div className="space-y-2">

                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" name="password" />
                        <div className="flex justify-between items-center gap-2">
                            <Label htmlFor="password"></Label>
                            <Link href="/auth/forgot-password" className="text-sm italic text-muted-foreground hover:text-foreground">
                                Forgot password?
                            </Link>
                        </div>
                    </div>
                    <ButtonWithLoader type="submit" className="w-full cursor-pointer" isLoading={isLoading} >
                        Login
                    </ButtonWithLoader>

                </form>
            </div>
            <p className="text-muted-foreground text-sm">Don&apos;t have an account?{" "}
                <Link href="/auth/register" className="text-sm text-muted-foreground hover:text-foreground">
                    Register
                </Link>
            </p>

        </>
    )
}