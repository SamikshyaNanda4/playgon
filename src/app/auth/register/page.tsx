
import { RegisterForm } from "@/my-components/register-form";
import { ReturnButton } from "@/my-components/return-button";
import { SignInOAuthButton } from "@/my-components/sign-in-oauth-btn";

const Page = () => {
    return (
        <>
            <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8 ">
                <div className="space-y-8">
                    <h1 className="text-3xl font-bold text-black">Register Here</h1>
                    <ReturnButton href="/" label="Home" />
                </div>
                <div className="space-y-4">
                    <RegisterForm />
                </div>

                <hr className="max=w-sm" />
                <div className="flex flex-col max-w-sm gap-4">
                    <SignInOAuthButton provider="google" signUp={true} />
                    {/* <SignInOAuthButton provider="github" signUp={true} /> */}
                </div>
            </div >


        </>
    )
}

export default Page;