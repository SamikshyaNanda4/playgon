"use client"
import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { sendVerificationEmail } from '@/lib/auth-client'

export const SendVerificationEmailForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const email = String(formData.get("email"))
        if (!email) return toast.error("Please enter your email.")

        await sendVerificationEmail({
            email,
            callbackURL: "/auth/verify",
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
                    toast.success("Verification Email sent successfully!");
                    router.push("/auth/verify/success")
                }
            }
        })


    }

    return (
        <form onSubmit={handleSubmit} className='max-w-sm w-full space-y-4'>
            <div className='flex flex-col gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input type='email' id='email' name='email' />
            </div>

            <Button type='submit' disabled={isLoading}>Resend Verification Email</Button>
        </form>
    )
}
