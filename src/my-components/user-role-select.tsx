"use client"

import { Role } from "@/generated/prisma"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { admin, useSession } from "@/lib/auth-client"
import { toast } from "sonner"

interface UserRoleSelectProps {
    userId: string,
    role: Role
}

export const UserRoleSelect = ({ userId, role }: UserRoleSelectProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    const session = useSession()
    console.log("session", session)
    console.log("userID", userId)

    const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newRole = event.target.value as Role;

        const changeRole = await admin.hasPermission({
            permissions: {
                user: ["set-role"]
            }
        })

        if (changeRole.error) {
            return toast.error("Forbidden User !")
        }

        if (role !== newRole && userId !== session.data?.user?.id) {
            await admin.setRole({
                userId,
                role: newRole,
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
                        toast.success(" User Updated Successfully")
                        router.refresh()
                    }
                }

            })
        }
    }

    return (
        <select value={role} onChange={handleChange} disabled={isLoading}
            className="px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
            <option value="ARENAMASTER">Arena Master</option>

        </select>
    )
}
