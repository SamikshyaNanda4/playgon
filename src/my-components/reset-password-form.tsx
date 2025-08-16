"use client"
import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ButtonWithLoader } from './button-with-loader'
import { EyeOff, Eye } from 'lucide-react'
import { resetPassword } from '@/lib/auth-client'

interface ResetPasswordFormProps {
    token: string
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showPassword1, setShowPassword1] = useState<boolean>(false)
    const [showPassword2, setShowPassword2] = useState<boolean>(false)
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const password = String(formData.get("password"))
        const confirmPassword = String(formData.get("confirmPassword"))

        if (!password) return toast.error("Please enter your Password.")
        if (!confirmPassword) return toast.error("Please confirm your Password.")

        if (password !== confirmPassword) {
            toast.error("Password do not match.")
            return;
        }



        await resetPassword({
            newPassword: password,
            token: token,
            fetchOptions: {
                onRequest: () => {
                    setIsLoading(true)
                },
                onResponse: () => {
                    setIsLoading(false)
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                },
                onSuccess: () => {
                    router.push("/auth/login")
                    toast.success("Password reset successful!");
                }
            }
        })


    }

    return (
        <form onSubmit={handleSubmit} className='max-w-sm w-full space-y-4'>
            <div className='flex flex-col gap-2'>
                <Label htmlFor='password'>New Password</Label>
                {/* <Input type='password' id='password' name='password' /> */}
                <div className="relative">
                    <Input
                        type={showPassword1 ? "text" : "password"}
                        id="password"
                        name="password"
                        className="pr-10" // Add padding so text doesn't overlap with icon
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-2 flex items-center text-muted-foreground"
                        onClick={() => setShowPassword1((prev) => !prev)}
                    >
                        {showPassword1 ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <Label htmlFor='confirmPassword'>Confirm New Password</Label>
                <div className="relative">
                    <Input
                        type={showPassword2 ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        className="pr-10" // Add padding so text doesn't overlap with icon
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-2 flex items-center text-muted-foreground"
                        onClick={() => setShowPassword2((prev) => !prev)}
                    >
                        {showPassword2 ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>
                {/* <Input type='password' id='confirmPassword' name='confirmPassword' /> */}
            </div>

            {/* <Button type='submit' disabled={isLoading}>Send Reset Link</Button> */}
            <ButtonWithLoader type='submit' isLoading={isLoading}>Reset Password</ButtonWithLoader>
        </form>
    )
}
