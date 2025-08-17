"use client"

import React, { use, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ButtonWithLoader } from './button-with-loader'
// import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { updateUser } from '@/lib/auth-client'
import { Eye, EyeOff } from 'lucide-react'
import { changePasswordAction } from '@/actions/ change-password-action'


const ChangePasswordForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [password1, setPassword1] = useState<boolean>(false)
    const [password2, setPassword2] = useState<boolean>(false)
    const [password3, setPassword3] = useState<boolean>(false)


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        const formData = new FormData(event.target as HTMLFormElement);
        const { error } = await changePasswordAction(formData)
        if (error) {
            toast.error(error)
        } else {
            toast.success("Password changed successfully!");
            (event.target as HTMLFormElement).reset();
        }
        setIsLoading(false)
    }

    return (
        <>
            <div>update-password-form</div>

            <form action="" className='max-w-sm w-full space-y-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                        <Input
                            type={password1 ? "text" : "password"}
                            id="currentPassword"
                            name="currentPassword"
                            className="pr-5" // Add padding so text doesn't overlap with icon
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-2 flex items-center text-muted-foreground"
                            onClick={() => setPassword1((prev) => !prev)}
                        >
                            {password1 ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                        <Input
                            type={password2 ? "text" : "password"}
                            id="newPassword"
                            name="newPassword"
                            className="pr-5" // Add padding so text doesn't overlap with icon
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-2 flex items-center text-muted-foreground"
                            onClick={() => setPassword2((prev) => !prev)}
                        >
                            {password2 ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                        <Input
                            type={password3 ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            className="pr-5" // Add padding so text doesn't overlap with icon
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-2 flex items-center text-muted-foreground"
                            onClick={() => setPassword3((prev) => !prev)}
                        >
                            {password3 ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
                <ButtonWithLoader type='submit' isLoading={isLoading}>
                    Change Password
                </ButtonWithLoader>
            </form>
        </>
    )
}

export default ChangePasswordForm