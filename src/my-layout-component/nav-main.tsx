"use client"

import { Home, HomeIcon, MessageCircleDashed, type Icon } from "lucide-react"

import { ButtonWithLoader } from "@/my-components/button-with-loader"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { title } from "process"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"


export function NavMain(
    { items, handleSelectMenu }: {
        items: {
            title: string,
            url: string,
            icon?: any,
            selected?: boolean,
        }[],
        handleSelectMenu: (title: string) => void;
    }
) {
    const pathname = usePathname()

    useEffect(() => {
        const match = items.find((item) => pathname.startsWith(item.url))
        if (match) {
            handleSelectMenu(match.title)
        }
    }, [])
    const router = useRouter()

    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center gap-2">
                        <SidebarMenuButton tooltip="Home" onClick={() => {
                            handleSelectMenu("Home")
                            router.push("/home")
                        }}
                            className={items.some((item) => item.selected === true) ? "none" : style}
                        >
                            <HomeIcon />
                            <span>Home</span>
                        </SidebarMenuButton >
                        <Button size="icon" className="size-8 group-data-[collapsible=icon]:opacity-0" variant="outline">
                            <MessageCircleDashed />
                            <span className="sr-only">Inbox</span>
                        </Button>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <Link href={item.url}>
                                <SidebarMenuButton tooltip={item.title} className={item.selected ? style : "none"} onClick={() => {
                                    console.log(handleSelectMenu(item.title), "RESULT")
                                    // router.push(item.url)
                                }} >
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )

}

const style = "bg-lime-600 text-primary-foreground hover:bg-lime-500/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"