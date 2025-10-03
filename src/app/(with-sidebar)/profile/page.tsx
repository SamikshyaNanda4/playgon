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
            <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 container mx-auto max-w-screen-lg space-y-4 sm:space-y-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Profile Page</h1>

                <div className="flex flex-col gap-3 sm:gap-4">
                    {/* Action Buttons Section */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        {
                            session.user.role === "ADMIN" && (
                                <Button size='sm' className="w-full sm:w-auto" asChild>
                                    <Link href="/admin/dashboard">Admin Dashboard</Link>
                                </Button>
                            )
                        }
                       
                    </div>
                    <SignOutButton />
                    {/* Permissions Section */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-lg sm:text-xl font-bold">Permissions</h3>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                            <Button size='sm' className="w-full sm:w-auto">MANAGE OWN POSTS</Button>
                            <Button size='sm' className="w-full sm:w-auto" disabled={!FULL_POST_ACCESS.success}>MANAGE ALL POSTS</Button>
                        </div>
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