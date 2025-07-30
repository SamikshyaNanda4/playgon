
import { auth } from "@/lib/auth";
import { ReturnButton } from "@/my-components/return-button";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { div } from "framer-motion/client";
// import { prisma } from "@/lib/prisma";
import { Trash } from "lucide-react";
import { ButtonWithLoader } from "@/my-components/button-with-loader";
import { DeleteButton, PlaceholderDeleteUserButton } from "@/my-components/delete-button";
import { UserRoleSelect } from "@/my-components/user-role-select";
import { Role } from "@/generated/prisma";


const Page = async () => {
    const headersList = await headers()

    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) redirect("/auth/login")
    // const users = await prisma.user.findMany({   //Prisma Query commented, now its time for the authorization permissions.ts file configured
    //     orderBy: {                               //with auth and authCLient to do the magic of the statements
    //         name: "asc"
    //     }
    // })   
    const { users } = await auth.api.listUsers({
        headers: headersList,
        query: {
            sortBy: "name",
            // limit: 10,
            // offset: 0    //this is for future pagination
        }
    })



    if (session && session.user.role !== "ADMIN") {

        return (
            <>
                <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8 ">
                    <div className="space-y-8">
                        <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
                        <ReturnButton href="/profile" label="Profile" />
                        <p className="p-2 rounded-md text-lg bg-red-600 text-white font-bold">YOUR'E FORBIDDEN TO USE THE ADMIN DASHBOARD</p>
                    </div>
                </div>

            </>
        )
    }
    else if (!session) {
        return (
            <>
                <p>You're not authenticated or authorized to use this routes</p>
            </>
        )
    }
    else {
        return (
            <>
                <>
                    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8 ">
                        <div className="space-y-8">
                            <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
                            <ReturnButton href="/profile" label="Profile" />
                            <p className="p-2 rounded-md text-lg bg-green-400 text-white font-bold">ACCESS GRANTED! </p>
                        </div>
                    </div>

                    <div className="w-full overflow-x-auto">
                        <table className="table-auto min-w-full whitespace-nowrap">
                            <thead>
                                <tr className="border-b text-sm text-left">
                                    <th className="px-2 py-2">ID</th>
                                    <th className="px-2 py-2">Name</th>
                                    <th className="px-2 py-2">Email</th>
                                    <th className="px-2 py-2">Role</th>
                                    <th className="px-2 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map(user => (
                                        <tr key={user.id} className="border-b text-sm text-left">
                                            <td className="px-4 py-2">{user.id.slice(0, 8)}</td>
                                            <td className="px-4 py-2">{user.name}</td>
                                            <td className="px-4 py-2">{user.email}</td>
                                            <td className="px-4 py-2">
                                                <UserRoleSelect userId={user.id} role={user.role as Role} />
                                            </td>
                                            <td className="px-4 py-2 ">
                                                {
                                                    user.role === "ADMIN" && user.name === session.user.name ? (
                                                        <PlaceholderDeleteUserButton />
                                                    ) : (
                                                        <DeleteButton userId={user.id} />
                                                    )
                                                }
                                            </td>
                                        </tr>

                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                </>
            </>
        )
    }



}

export default Page;