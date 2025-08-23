import { RegisterForm } from "@/my-components/register-form";
import { ReturnButton } from "@/my-components/return-button";
import { SignInOAuthButton } from "@/my-components/sign-in-oauth-btn";
import Image from "next/image";

const Page = () => {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left side - Register Content (flexible on mobile, 6/10 on desktop) */}
            <div className="flex-1 lg:w-3/5 flex items-center justify-center p-4 sm:p-8 bg-background">
                <div className="w-full max-w-md space-y-8">
                    <div className="space-y-8">
                        <h1 className="text-3xl font-bold text-black">Register Here</h1>
                        <ReturnButton href="/" label="Home" />
                    </div>
                    <div className="space-y-4">
                        <RegisterForm />
                    </div>
                    <hr className="max-w-sm" />
                    <div className="flex flex-col max-w-sm gap-4">
                        <SignInOAuthButton provider="google" signUp={true} />
                        {/* <SignInOAuthButton provider="github" signUp={true} /> */}
                    </div>
                </div>
            </div>

            {/* Right side - Image (hidden on mobile, 4/10 on desktop) */}
            <div className="hidden lg:block lg:w-2/5 relative">
                <Image
                    src="/sports-images.jpg" 
                    alt="Register background"
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