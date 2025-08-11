import { LoginForm } from "@/my-components/login-form";
import { ReturnButton } from "@/my-components/return-button";
import { SignInOAuthButton } from "@/my-components/sign-in-oauth-btn";
import { error } from "console";

interface PageProp {
    searchParams: Promise<{ error: string }>
}

const Page = async ({ searchParams }: PageProp) => {
    const searchP = await searchParams;

    return (
        <>
            <div className="px-8 py-16  container mx-auto max-w-screen-lg space-y-8 ">
                <div className="space-y-8">
                    {/* <h1 className="text-3xl font-bold text-red-500">Error while Loggin in or Signing up.</h1> */}
                    {/* <RegisterForm /> */}
                    <ReturnButton href="/auth/login" label="Go Back to Login Page" />
                </div>
                <p className="text-destructive">
                    {searchP.error === "account_not_linked" ?
                        "This account is already linked to another sign-in method credential" :
                        "Oops! Something went wrong, Please try again"
                    }
                </p>

            </div>

        </>
    )
}

export default Page;