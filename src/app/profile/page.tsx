// import { RegisterForm } from "@/app/my-components/register-form";
import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { SignOutButton } from "../../my-components/sign-out-button";

const Page = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return (
            <>
                <p className="text-destructive">Unauthorized Profile</p>
            </>
        )
    }


    return (
        <>
            <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8 ">
                <h1 className="text-3xl font-bold text-black">Profile Page</h1>
            </div>
            <SignOutButton />
            <pre className="text-sm overflow-clip">
                {JSON.stringify(session, null, 2)}
            </pre>
        </>
    )
}
export default Page;