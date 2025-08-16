import { ReturnButton } from "@/my-components/return-button";



const Page = () => {


    return (
        <>
            <div className="px-8 py-16  container mx-auto max-w-screen-lg space-y-8 ">
                <div className="space-y-2">
                    <ReturnButton href="/auth/login" label="Login page " />
                    <h1 className="text-3xl font-bold text-green-600">
                        Success! You have sent a password reset link to your email.</h1>
                    {/* <RegisterForm /> */}
                    <p className="text-muted-foreground italic text-sm">If you have not sent any password reset request to your email please ignore this message</p>
                </div>
            </div>

        </>
    )
}

export default Page;