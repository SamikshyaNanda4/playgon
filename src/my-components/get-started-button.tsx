"use client"

import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client"
import Link from "next/link";

export const GetStartedButton = () => {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return (
            <>
                <Button size="lg" className="opacity-50 rounded-xl bg-gradient-to-r from-green-100 to-green-600">
                    Get Started
                </Button>
            </>
        )
    }

    const href = session ? "/profile" : "/auth/login"

    return (
        <>
            <div className="flex flex-col items-center gap-6 mt-4">
                <Button
                    size="lg"
                    className="rounded-xl px-10 py-6 text-lg font-semibold bg-gradient-to-r from-green-100 to-green-600 hover:from-green-200 hover:to-green-700 shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_40px_rgba(147,51,234,0.5)] transition-all duration-300 border-0 animate-fade-in-up"
                    asChild 
                >
                    <Link href={href}>
                        Get Started
                    </Link>
                </Button>
                {session && (
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-amber-500/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative backdrop-blur-sm bg-zinc-900/50 border border-zinc-800/50 rounded-2xl px-6 py-4 shadow-xl">
                            <p className="flex items-center gap-3 text-base">
                                <span
                                    data-role={session?.user.role}
                                    className="size-3 rounded-full animate-pulse data-[role=USER]:bg-blue-400 data-[role=ADMIN]:bg-green-500 data-[role=ARENAMASTER]:bg-amber-300 shadow-[0_0_10px_currentColor]"
                                />
                                <span className="bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent font-medium">
                                    Welcome back, <span className="font-bold">{session?.user?.name}</span>!
                                </span>
                                <span className="text-xl">👋</span>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}