//Creating a better AUth instance here on auth.ts file
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma"

import { prisma } from "@/lib/prisma"
import { hashPassword, verifyPassword } from "@/lib/argon2";

import { nextCookies } from "better-auth/next-js";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { getValidDomains, normalizeName } from "@/lib/utils";
import { Role } from "@/generated/prisma";
import { admin } from "better-auth/plugins"
import { ac, roles } from "@/lib/permissions"
import { sendEmailAction } from "@/actions/send-email-action";
import { addLocalUser } from "@/actions/add-local-user-action";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    socialProviders: {
        google: {
            clientId: String(process.env.GOOGLE_CLIENT_ID),
            clientSecret: String(process.env.GOOGLE_CLIENT_SECRET)
        }
    },
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 8,
        maxPasswordLength: 160,
        resetPasswordTokenExpiresIn: 30 * 30,
        autoSignIn: false,
        password: {
            hash: hashPassword,
            verify: verifyPassword
        },
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url }) => {
            await sendEmailAction({
                to: user.email,
                subject: "Reset Password on your playgon account",
                meta: {
                    description: "Please click the link below to reset your password.",
                    link: String(url)
                }
            })
        }
    },
    emailVerification: {
        expiresIn: 30 * 60, //expires in 30 minutes
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }) => {

            const link = new URL(url);
            link.searchParams.set("callbackURL", "/auth/verify")
            console.log("url before changing", url)
            await sendEmailAction({
                to: user.email,
                subject: "Verify your Email with playgon",
                meta: {
                    description: "Please verify your email address to complete the registation process.",
                    link: String(link)
                }
            })
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
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(";") ?? []
                    if (ADMIN_EMAILS.includes(user.email)) {
                        return { data: { ...user, role: "ADMIN" } }
                    }
                    return { data: user }
                },
                after: async (user) => {
                    //user_local db registration addition window
                    addLocalUser(user.id)
                    console.log(user, "USER CREATED SUCCESSFULLY")

                }
            }
        }
    },
    user: {
        additionalFields: {
            role: {
                type: ["USER", "ADMIN", "ARENAMASTER"] as Array<Role>,
                input: false
            }
        }
    },
    session: {
        expiresIn: 30 * 24 * 60 * 60 * 12 //approx 12 months
    },
    advanced: {
        database: {
            generateId: false
        },
    },
    plugins: [nextCookies(), admin({
        defaultRole: Role.USER,
        adminRoles: [Role.ADMIN],
        ac,
        roles
    })] // this make you remove the signInEmail Async server actions cookies logic as it handles solo-->talking about nextCookies() here
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN"

