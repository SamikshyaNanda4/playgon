// import { RegisterForm } from "@/app/my-components/register-form";
import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { SignOutButton } from "../../../my-components/sign-out-button";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import UpdateUserForm from "@/my-components/update-user-form";
import ChangePasswordForm from "@/my-components/change-password-form";

const Page = async () => {
    const headersList = await headers()

    const session = await auth.api.getSession({
        headers: headersList
    })

    if (!session) {
        redirect("/auth/login")
    }

    const FULL_POST_ACCESS = await auth.api.userHasPermission({
        headers: headersList,
        body: {
            // userId: session.user.id, if headers not provide
            permissions: {
                posts: ["update", "delete"]
            }
        }
    })


    return (
        <>
            <div className="px-2 py-1 container mx-auto max-w-screen-lg space-y-4 ">
                <h1 className="text-3xl font-bold">Profile Page</h1>

                <div className="flex items-center gap-2">
                    {
                        session.user.role === "ADMIN" && (
                            <Button size='sm' asChild>
                                <Link href="/admin/dashboard">Admin Dashboard</Link>
                            </Button>
                        )
                    }
                    <SignOutButton />
                    <div className="text-2x font-bold">Permissions--</div>
                    <div className="space-x-4">
                        <Button size='sm'>MANAGE OWN POSTS</Button>
                        <Button size='sm' disabled={!FULL_POST_ACCESS.success}>MANAGE ALL POSTS</Button>
                    </div>
                </div>
                {session?.user?.image ? (
                    <Image
                        src={session.user.image}
                        alt="user image"
                        width={56}   // 👈 size-14 in Tailwind = 56px
                        height={56}
                        className="rounded-md object-cover"
                    />
                ) : (
                    <div className="size-14 border border-primary rounded-md bg-primary text-primary-foreground flex items-center justify-center">
                        <span className="uppercase text-lg font-bold">
                            {session.user.name.split(" ")[2] ?
                                session.user.name.split(" ")[0].charAt(0) + session.user.name.split(" ")[2].charAt(0) :
                                session.user.name.split(" ")[0].charAt(0) + (session.user.name.split(" ")[1]?.charAt(0) || "")
                            }
                        </span>
                    </div>
                )}

                <div className="space-y-8 p-4 rounded-b-md border border-t-8 border-cyan-700">
                    <h2 className="text-xl font-bold">
                        Change Password
                    </h2>
                    <ChangePasswordForm />
                </div>


                <div className="space-y-8 p-4 rounded-b-md border border-t-8 border-lime-600">
                    <h2 className="text-xl font-bold">
                        Update User
                    </h2>
                    <UpdateUserForm image={session?.user?.image ?? ""}
                        name={session.user.name} />
                </div>

                <pre className="text-sm overflow-clip">
                    {JSON.stringify(session, null, 2)}
                </pre>




            </div>
        </>
    )
}
export default Page;