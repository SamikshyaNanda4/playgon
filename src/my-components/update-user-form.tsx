"use client"

import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ButtonWithLoader } from './button-with-loader'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { updateUser } from '@/lib/auth-client'

interface UpdateUserFormProps {
    name: string;
    image: string;


}

const UpdateUserForm = ({ name, image }: UpdateUserFormProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement);
        const name = String(formData.get("name"))
        const image = String(formData.get("image"))
        if (!name && !image) {
            toast.error("Please enter a name or image")
        }
        await updateUser({

            ...(name && { name }),
            image,
            fetchOptions: {
                onRequest: () => {
                    setIsLoading(true)
                },
                onResponse: () => {
                    setIsLoading(false);
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                },
                onSuccess: () => {
                    toast.success("User Details updated successfully!");
                    (event.target as HTMLFormElement).reset();
                    router.refresh();
                }

            }
        })

    }
    return (
        <>
            <div>update-user-form</div>

            <form action="" className='max-w-sm w-full space-y-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='name'>Name</Label>
                    <Input type='text' id='name' name='name' defaultValue={name} />
                </div>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='image'>Image</Label>
                    <Input type='url' id='image' name='image' defaultValue={image} />
                </div>
                <ButtonWithLoader type='submit' isLoading={isLoading}>
                    Update User
                </ButtonWithLoader>
            </form>
        </>
    )
}

export default UpdateUserForm