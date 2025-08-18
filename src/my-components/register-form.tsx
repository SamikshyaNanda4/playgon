"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
// import { signUp } from "@/lib/auth.client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ButtonWithLoader } from "./button-with-loader"
import Link from "next/link"
import { signUpEmailAction } from "@/actions/sign-up-email-action"
import { Eye, EyeOff } from "lucide-react"

export const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        const formData = new FormData(event.target as HTMLFormElement);
        const { error } = await signUpEmailAction(formData)
        if (error) {
            toast.error(error)
            setIsLoading(false)
        } else {
            toast.success("Verify your email and let's get started!")
            setIsLoading(false)
            router.push("/auth/register/success")

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
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="pr-10" // Add padding so text doesn't overlap with icon
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-2 flex items-center text-muted-foreground"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                    <ButtonWithLoader type="submit" className="w-full cursor-pointer" isLoading={isLoading} >
                        Register
                    </ButtonWithLoader>

                </form>
            </div>
            <p className="text-muted-foreground text-sm">Already have an account?{" "}
                <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-foreground">
                    Login
                </Link>
            </p>

        </>
    )
}