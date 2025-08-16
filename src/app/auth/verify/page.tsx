import { LoginForm } from "@/my-components/login-form";
import { ReturnButton } from "@/my-components/return-button";
import { SignInOAuthButton } from "@/my-components/sign-in-oauth-btn";
import { error } from "console";
import { SendVerificationEmailForm } from "@/my-components/send-verification-email-form";
import { redirect } from "next/navigation";

interface PageProp {
    searchParams: Promise<{ error: string }>
}

const Page = async ({ searchParams }: PageProp) => {
    const searchP = await searchParams;
    const error = (await searchParams).error


    //another guard on top of the middleware
    if (!error) redirect("/profile")

    return (
        <>
            <div className="px-8 py-16  container mx-auto max-w-screen-lg space-y-8 ">
                <div className="space-y-8">
                    <ReturnButton href="/auth/login" label="Go Back to Login Page" />
                    <h1 className="text-3xl font-bold text-blue-600">Verify your Email.</h1>
                    {/* <RegisterForm /> */}

                </div>
                <p className={searchP.error ? "text-destructive" : "none"}>
                    {searchP.error === "invalid_token" || searchP.error === "token_expired" ?
                        "Your token is invalid, please request a new one." : searchP.error === "email_not_verified" ?
                            "Your email is not verified with Playgon.Please verify you email to sign in to our site." :
                            !!searchP.error ?
                                "Oops! Something went wrong in this page, Please try again or contact our team for." : "give your email credentials below."
                    }
                </p>
                <br />
                <SendVerificationEmailForm />
            </div>

        </>
    )
}

export default Page;