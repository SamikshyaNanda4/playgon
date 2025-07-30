"use client"

import { Role } from "@/generated/prisma"
import { select } from "framer-motion/client"
import { useState } from "react"

interface UserRoleSelectProps {
    userId: string,
    role: Role
}

export const UserRoleSelect = ({ userId, role }: UserRoleSelectProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const handleChange = async () => {

    }

    return (
        <select value={role} onChange={handleChange} disabled={isLoading}
            className="px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
        </select>
    )
}
