import { LoginForm } from "@/my-components/login-form";
import { ReturnButton } from "@/my-components/return-button";
import { SignInOAuthButton } from "@/my-components/sign-in-oauth-btn";

const Page = () => {
    return (
        <>
            <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8 ">
                <div className="space-y-8">
                    <h1 className="text-3xl font-bold text-black">Login Page Here</h1>
                    {/* <RegisterForm /> */}
                    <ReturnButton href="/" label="Home" />
                </div>
                <div className="space=y-4">
                    <LoginForm />
                </div>
                <hr className="max=w-sm" />
                <div className="flex flex-col max-w-sm gap-4">
                    <SignInOAuthButton provider="google" />
                    {/* <SignInOAuthButton provider="github" /> */}
                </div>

            </div>

        </>
    )
}

export default Page;