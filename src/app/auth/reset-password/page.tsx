import { ReturnButton } from "@/my-components/return-button";
import { redirect } from "next/navigation";
import { ResetPasswordForm } from "@/my-components/reset-password-form";


interface PageProps {
    searchParams: Promise<{ token: string }>

}


const Page = async ({ searchParams }: PageProps) => {

    const token = (await searchParams).token
    if (!token) {
        redirect("login")
    }

    return (
        <>
            <div className="px-8 py-16  container mx-auto max-w-screen-lg space-y-8 ">
                <div className="space-y-2">
                    <ReturnButton href="/auth/login" label="Login page " />
                    <h1 className="text-3xl font-bold text-green-600">
                        Reset Password.</h1>
                    <p className="text-sm italic text-muted-foreground">If you have not send any password reset link to your email please ignore this message.</p>
                    {/* <RegisterForm /> */}
                </div>

                <br />
                <h2 className="text-xl">Please enter your new password and make sure it is atleast 8 characters.</h2>
                <ResetPasswordForm token={token} />
            </div>

        </>
    )
}

export default Page;