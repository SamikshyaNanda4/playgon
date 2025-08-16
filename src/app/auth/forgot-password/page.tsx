import { ReturnButton } from "@/my-components/return-button";
import { ForgotPasswordForm } from "@/my-components/forgot-password-form";


const Page = () => {


    return (
        <>
            <div className="px-8 py-16  container mx-auto max-w-screen-lg space-y-8 ">
                <div className="space-y-8">
                    <ReturnButton href="/auth/login" label="Login page " />
                    <h1 className="text-3xl font-bold text-green-600">Please Enter your email address to recieve a password reset link.</h1>
                    {/* <RegisterForm /> */}
                    <ForgotPasswordForm />
                </div>
            </div>

        </>
    )
}

export default Page;