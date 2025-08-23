"use client"

import { HomeIcon, MessageCircleDashed, type LucideIcon } from "lucide-react"
import { type Icon } from "@tabler/icons-react"
// import { ButtonWithLoader } from "@/my-components/button-with-loader"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"


export function NavMain(
    { items}: {
        items: {
            title: string,
            url: string,
            icon?: LucideIcon | Icon,
            selected?: boolean,
        }[],
    }
) {
    const pathname = usePathname()
        // Determine active item based on current pathname
    const getIsActive = (url: string) => {
        return pathname === url || pathname.startsWith(url + "/")
    }

    const isHomeActive = pathname === "/" || pathname.startsWith("/home")

    // useEffect(() => {
    //     const selected = items.some(item => item.selected === true)
    //     const match = items.find((item) => pathname.startsWith(item.url))
    //     if (match && !selected) {
    //         handleSelectMenu(match.title)
    //     }
    // }, [pathname, items, handleSelectMenu])
    // const router = useRouter()

    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center gap-2">
                        <SidebarMenuButton 
                            asChild
                            tooltip="Home" 
                            className={isHomeActive ? style : "none"}
                        >
                            <Link href="/home">
                                <HomeIcon />
                                <span>Home</span>
                            </Link>
                        </SidebarMenuButton>
                        <Button size="icon" className="size-8 group-data-[collapsible=icon]:opacity-0" variant="outline">
                            <MessageCircleDashed />
                            <span className="sr-only">Inbox</span>
                        </Button>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu>
                    {items.map((item) => {
                        const isActive=getIsActive(item.url)
                        return (
                            <SidebarMenuItem key={item.title}>
                            <Link href={item.url}>
                                <SidebarMenuButton asChild tooltip={item.title} className={isActive ? style : "none"} >
                                    <Link href={item.url}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )

}

const style = "bg-lime-600 text-primary-foreground hover:bg-lime-500/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
const styleHome = "flex items-center gap-2 bg-lime-600 text-primary-foreground hover:bg-lime-500/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"