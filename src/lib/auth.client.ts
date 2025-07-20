import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    /**  
        the base URL of the server (optional if you are using the same domain for everything)
    **/
    baseURL: process.env.NEXT_PUBLIC_API_URL,

})

export const {
    signUp,
    signOut,
    signIn
} = authClient; 