import { LoginForm } from "@/my-components/login-form";
import { ReturnButton } from "@/my-components/return-button";
import { SignInOAuthButton } from "@/my-components/sign-in-oauth-btn";
import Image from "next/image";

const Page = () => {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left side - Login Content (flexible on mobile, 6/10 on desktop) */}
            <div className="flex-1 lg:w-3/5 flex items-center justify-center p-4 sm:p-8 bg-background">
                <div className="w-full max-w-md space-y-8">
                    <div className="space-y-8">
                        <h1 className="text-3xl font-bold text-black">Login Page Here</h1>
                        <ReturnButton href="/" label="Home" />
                    </div>
                    <div className="space-y-4">
                        <LoginForm />
                    </div>
                    <hr className="max-w-sm" />
                    <div className="flex flex-col max-w-sm gap-4">
                        <SignInOAuthButton provider="google" />
                        {/* <SignInOAuthButton provider="github" /> */}
                    </div>
                </div>
            </div>

            {/* Right side - Image (hidden on mobile, 4/10 on desktop) */}
            <div className="hidden lg:block lg:w-2/5 relative">
                <Image
                    src="/sports-image.jpg"
                    alt="Login background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Optional gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10" />
            </div>
        </div>
    )
}

export default Page;