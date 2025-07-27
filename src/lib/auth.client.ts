import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "@/lib/auth"

export const authClient = createAuthClient({
    /**  
        the base URL of the server (optional if you are using the same domain for everything)
    **/
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    plugins: [inferAdditionalFields<typeof auth>()]

})

export const {
    signUp,
    signOut,
    signIn,
    useSession
} = authClient; 