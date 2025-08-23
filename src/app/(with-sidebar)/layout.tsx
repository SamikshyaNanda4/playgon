

import { AppSidebar } from "@/my-layout-component/app-sidebar"
// import { SiteHeader } from "@/components/site-header"

import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { SiteHeader } from "@/my-layout-component/site-header";
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Layout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>
) {
    const headersList = await headers()
    const session = await auth.api.getSession({
        headers: headersList
    })
    if (!session?.user) {
        redirect("/auth/login")
    }
    const userInLocal = await prisma.userLocal.findFirst({
        where: {
            authId: session.user.id,
        }
    })
    if (!userInLocal?.IGN) {
        redirect("/add-player")
    }
    console.log(userInLocal, "Userinlocal")

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 62)",
                    "--header-height": "calc(var(--spacing) * 22)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="sidebar" />
            <SidebarInset>
                <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <SiteHeader />
                </div>

                {/* body area fills remaining height */}
                <div className="flex flex-1 flex-col h-[calc(100vh-var(--header-height))] overflow-hidden">
                    {/* only this part scrolls */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4">
                            <Suspense fallback= {<>Loading...</>}>
                                {children}
                            </Suspense>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
