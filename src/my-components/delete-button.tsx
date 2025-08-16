"use client"
import { Trash } from "lucide-react";
import { ButtonWithLoader } from "@/my-components/button-with-loader";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteUserAction } from "@/actions/delete-user-action";
import { toast } from "sonner";

interface DeleteUserButtonProps {
    userId: string
}


export const DeleteButton = ({ userId }: DeleteUserButtonProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleDelete = async () => {
        setIsLoading(true)
        const { error } = await deleteUserAction({ userId })
        if (error) {
            toast.error(error)
        } else {
            toast.success("user deleted successfully!")
        }
        setIsLoading(false)

    }

    return (
        <>
            <ButtonWithLoader isLoading={isLoading} variant="destructive" onClick={handleDelete}>
                <span className="flex items-center gap-2 whitespace-nowrap leading-none">
                    <Trash className="w-4 h-4" />
                    Delete User
                </span>
            </ButtonWithLoader>
        </>
    )
}

export const PlaceholderDeleteUserButton = () => {
    const handleDelete = async () => {
        return;
    }

    return (
        <>
            <Button disabled={true} variant="secondary" onClick={handleDelete}>
                <span className="flex items-center gap-2 whitespace-nowrap leading-none">
                    <Trash className="w-4 h-4" />
                    Delete User
                </span>
            </Button >
        </>
    )
}
