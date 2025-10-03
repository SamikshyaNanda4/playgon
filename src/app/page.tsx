import { GetStartedButton } from "@/my-components/get-started-button"

export default function Page() {
    return (
        <>
            <div className="relative flex items-center justify-center h-dvh overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-500" />
                </div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

                <div className="relative z-10 flex justify-center gap-4 sm:gap-6 flex-col items-center px-6 w-full max-w-screen-xl">
                    {/* Logo/Brand Name */}
                    <div className="relative group py-3 sm:py-4">
                        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-2xl animate-fade-in leading-tight pb-2 text-center">
                            Playgon
                        </h1>
                        <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-amber-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                    </div>

                    {/* Tagline */}
                    <p className="text-zinc-400 text-base sm:text-lg md:text-xl font-light tracking-wide animate-fade-in-delay text-center px-4">
                        Your Ultimate Sports Community
                    </p>

                    <GetStartedButton />
                </div>
            </div>
        </>
    )
}