// import { RegisterForm } from "@/app/my-components/register-form";
import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { SignOutButton } from "../../my-components/sign-out-button";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/auth/login")
    }


    return (
        <>
            <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8 ">
                <h1 className="text-3xl font-bold text-black">Profile Page</h1>
            </div>
            <div className="flex items-center gap-2">
                {
                    session.user.role === "ADMIN" && (
                        <Button size='sm' asChild>
                            <Link href="/admin/dashboard">Admin Dashboard</Link>
                        </Button>
                    )
                }
                <SignOutButton />
            </div>
            <pre className="text-sm overflow-clip">
                {JSON.stringify(session, null, 2)}
            </pre>
        </>
    )
}
export default Page;