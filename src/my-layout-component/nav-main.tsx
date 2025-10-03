"use client"

import { HomeIcon, MessageCircleDashed, type LucideIcon } from "lucide-react"
import { type Icon } from "@tabler/icons-react"
// import { ButtonWithLoader } from "@/my-components/button-with-loader"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
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
    const { isMobile, setOpenMobile } = useSidebar()

    // Determine active item based on current pathname
    const getIsActive = (url: string) => {
        return pathname === url || pathname.startsWith(url + "/")
    }

    const isHomeActive = pathname === "/" || pathname.startsWith("/home")

    // Close sidebar on mobile when a navigation item is clicked
    const handleNavClick = () => {
        if (isMobile) {
            setOpenMobile(false)
        }
    }

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
                            <Link href="/home" onClick={handleNavClick}>
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
                                <SidebarMenuButton asChild tooltip={item.title} className={isActive ? style : "none"} >
                                    <Link href={item?.url} onClick={handleNavClick}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
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