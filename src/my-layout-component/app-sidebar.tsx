"use client"

import * as React from "react"
import {
    IconCamera,
    IconChartBar,
    IconDashboard,
    IconDatabase,
    IconFileAi,
    IconFileDescription,
    IconFileWord,

    IconHelp,
    IconInnerShadowTop,

    IconReport,
    IconSearch,
    IconSettings,
    IconUser,
    IconUsers,
    IconCalendarBolt,
    IconPlayCard10
} from "@tabler/icons-react"



import { NavMain } from "@/my-layout-component/nav-main"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"


const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Arenas",
            url: "/arenas",
            icon: IconDashboard,
            selected: false
        },
        {
            title: "Play",
            url: "/play",
            icon: IconPlayCard10,
            selected: false
        },
        {
            title: "Booking",
            url: "/booking",
            icon: IconChartBar,
            selected: false
        },
        {
            title: "Calendar",
            url: "/calendar",
            icon: IconCalendarBolt,
            selected: false
        },
        {
            title: "Team",
            url: "/team",
            icon: IconUsers,
            selected: false
        },
        {
            title: "Profile",
            url: "/profile",
            icon: IconUser,
            selected: false
        }
    ],
    navClouds: [
        {
            title: "Capture",
            icon: IconCamera,
            isActive: true,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
        {
            title: "Proposal",
            icon: IconFileDescription,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
        {
            title: "Prompts",
            icon: IconFileAi,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: IconSettings,
        },
        {
            title: "Get Help",
            url: "#",
            icon: IconHelp,
        },
        {
            title: "Search",
            url: "#",
            icon: IconSearch,
        },
    ],
    documents: [
        {
            name: "Data Library",
            url: "#",
            icon: IconDatabase,
        },
        {
            name: "Reports",
            url: "#",
            icon: IconReport,
        },
        {
            name: "Word Assistant",
            url: "#",
            icon: IconFileWord,
        },
    ],
}



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    // function handleSelectMenu(title: string) {
    //     setourData((prev) => ({
    //         ...prev,
    //         navMain: prev.navMain.map((item) =>
    //             item.title === title
    //                 ? { ...item, selected: true }
    //                 : { ...item, selected: false }
    //         ),
    //     }))
    //     console.log(ourdata, "data")
    // }

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <Link href="/">
                                <IconInnerShadowTop className="!size-5" />
                                <span className="text-base font-semibold">Playgon.in</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain}
                // handleSelectMenu={handleSelectMenu} 
                />
                {/* <NavDocuments items={data.documents} />
                <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
            </SidebarContent>
            <SidebarFooter>
                {/* <NavUser user={data.user} /> */}
            </SidebarFooter>
        </Sidebar>
    )
}
