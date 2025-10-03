
import { auth } from "@/lib/auth";
import { ReturnButton } from "@/my-components/return-button";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
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
                    <div className=" px-8 py-16 container mx-auto max-w-screen-lg space-y-8 ">
                        <div className="space-y-8">
                            <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
                            <ReturnButton href="/profile" label="Profile" />
                            <p className="p-2 rounded-md text-lg bg-green-400 text-white font-bold">ACCESS GRANTED! </p>
                        </div>
                    </div>

                    {/* Mobile Card View */}
                    <div className="block md:hidden px-4 space-y-4">
                        {users.map(user => (
                            <div key={user.id} className="bg-gray-800 rounded-lg p-4 space-y-3 shadow-lg border border-gray-700">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-400">ID</p>
                                        <p className="text-sm font-mono text-gray-200">{user.id.slice(0, 8)}</p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        {user.role === "ADMIN" && user.name === session.user.name ? (
                                            <PlaceholderDeleteUserButton />
                                        ) : (
                                            <DeleteButton userId={user.id} />
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-400">Name</p>
                                    <p className="text-sm font-medium text-white">{user.name}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-400">Email</p>
                                    <p className="text-sm text-gray-200 break-all">{user.email}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-400">Role</p>
                                    <UserRoleSelect userId={user.id} role={user.role as Role} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tablet & Desktop Table View */}
                    <div className="hidden md:block container mx-auto px-4 lg:px-8 max-w-7xl">
                        <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-xl">
                            <table className="w-full border-collapse">
                                <thead className="bg-gray-800">
                                    <tr className="text-left">
                                        <th className="px-4 lg:px-6 py-4 text-xs lg:text-sm font-semibold text-gray-300 uppercase tracking-wider">ID</th>
                                        <th className="px-4 lg:px-6 py-4 text-xs lg:text-sm font-semibold text-gray-300 uppercase tracking-wider">Name</th>
                                        <th className="px-4 lg:px-6 py-4 text-xs lg:text-sm font-semibold text-gray-300 uppercase tracking-wider">Email</th>
                                        <th className="px-4 lg:px-6 py-4 text-xs lg:text-sm font-semibold text-gray-300 uppercase tracking-wider">Role</th>
                                        <th className="px-4 lg:px-6 py-4 text-xs lg:text-sm font-semibold text-gray-300 uppercase tracking-wider text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-900 divide-y divide-gray-700">
                                    {users.map(user => (
                                        <tr key={user.id} className="hover:bg-gray-800 transition-colors duration-150">
                                            <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm font-mono text-gray-400">{user.id.slice(0, 8)}</td>
                                            <td className="px-4 lg:px-6 py-4 text-sm lg:text-base font-medium text-white">{user.name}</td>
                                            <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm text-gray-300">{user.email}</td>
                                            <td className="px-4 lg:px-6 py-4">
                                                <UserRoleSelect userId={user.id} role={user.role as Role} />
                                            </td>
                                            <td className="px-4 lg:px-6 py-4 text-center">
                                                {user.role === "ADMIN" && user.name === session.user.name ? (
                                                    <PlaceholderDeleteUserButton />
                                                ) : (
                                                    <DeleteButton userId={user.id} />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </>
            </>
        )
    }



}

export default Page;