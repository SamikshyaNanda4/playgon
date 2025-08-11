import { createAccessControl } from "better-auth/plugins/access"
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access"
import { Role } from "@/generated/prisma";

const statements = {
    ...defaultStatements,
    posts: ["create", "read", "update", "delete", "update:own", "delete:own"],
} as const;

export const ac = createAccessControl(statements)
export const roles = {
    [Role.USER]: ac.newRole({
        posts: ["create", "read", "update:own", "delete:own"]
    }),
    [Role.ADMIN]: ac.newRole({
        ...adminAc.statements,
        posts: ["create", "read", "update", "delete", "update:own", "delete:own"]
    }),
    [Role.ARENAMASTER]: ac.newRole({
        posts: ["create", "read", "update:own", "delete:own"]
    })
}