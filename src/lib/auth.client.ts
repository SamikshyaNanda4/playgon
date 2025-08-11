import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields, adminClient } from "better-auth/client/plugins"
import type { auth } from "@/lib/auth"
import { ac, roles } from "@/lib/permissions"

export const authClient = createAuthClient({
    /**  
        the base URL of the server (optional if you are using the same domain for everything)
    **/
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    plugins: [inferAdditionalFields<typeof auth>(), adminClient({ ac, roles })]

})

export const {
    signUp,
    signOut,
    signIn,
    useSession,
    admin
} = authClient; 