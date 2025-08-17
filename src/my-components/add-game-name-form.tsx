"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { ButtonWithLoader } from './button-with-loader'
import { addGamerName } from '@/actions/add-gamer-name-action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const AddGamerNameForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        const formData = new FormData(event.target as HTMLFormElement);
        const { error } = await addGamerName(formData)
        if (error) {
            toast.error(error)
        } else {
            toast.success("Game name updated successfully")
            router.push("/home")
        }
        setIsLoading(false)
    }

    return (
        <div className="mt-4 mb-2">
            <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="gameName">Game Name</Label>
                    <Input type="text" id="gameName" name="gameName" />
                </div>
                <ButtonWithLoader type="submit" className="w-full cursor-pointer" isLoading={isLoading} >
                    Submit
                </ButtonWithLoader>
            </form>
        </div>
    )
}

export default AddGamerNameForm