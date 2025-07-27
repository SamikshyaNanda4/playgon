//Creating a better AUth instance here on auth.ts file
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma"

import { prisma } from "@/lib/prisma"
import { hashPassword, verifyPassword } from "@/lib/argon2";

import { nextCookies } from "better-auth/next-js";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { getValidDomains, normalizeName } from "@/lib/utils";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 8,
        autoSignIn: false,
        password: {
            hash: hashPassword,
            verify: verifyPassword
        }
    },
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path === "/sign-up/email") {
                const email = String(ctx.body.email)
                const domain = email.split("@")[1]
                if (!getValidDomains().includes(domain)) {
                    throw new APIError("BAD_REQUEST", {
                        message: "Invalid domain. Please use a valid email. "
                    })
                }
                const name = normalizeName(ctx.body.name)
                return {
                    context: { //Altering the curent context data when regexp for name is not perfect
                        ...ctx,
                        body: {
                            ...ctx.body,
                            name,
                        }
                    }
                }
            }
        })
    },
    user: {
        additionalFields: {
            role: {
                type: ["USER", "ADMIN", "ARENAMASTER"],
                input: false
            }
        }
    },
    session: {
        expiresIn: 30 * 24 * 60 * 60
    },
    advanced: {
        database: {
            generateId: false
        },
    },
    plugins: [nextCookies()] // this make you remove the signInEmail Async server actions cookies logic as it handles solo
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN"

