"use client"

import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client"
import { p } from "framer-motion/client";
import Link from "next/link";

export const GetStartedButton = () => {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return (
            <>
                <Button size="lg" className="opacity-50 rounded-xl">Get Started</Button>
            </>
        )
    }

    const href = session ? "/profile" : "/auth/login"

    return (
        <>
            <div className="flex flex-col items-center gap-4">

                <Button size="lg" className="rounded-xl mt-2.5" asChild>
                    <Link href={href}>
                        Get Started
                    </Link>
                </Button>
                {session && (
                    <p className="flex items-center gap-2">
                        <span data-role={session?.user.role} className="size-4 rounded-full animate-pulse data-[role=USER]:bg-blue-400 data-[role=ADMIN]:bg-green-500 data-[role=ARENAMASTER]:bg-amber-300" />
                        {`Welcome back, ${session?.user?.name}`} ! 👋 </p>
                )
                }
            </div>
        </>
    )
}