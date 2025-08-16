
import { ReturnButton } from "@/my-components/return-button";



const Page = () => {


    return (
        <>
            <div className="px-8 py-16  container mx-auto max-w-screen-lg space-y-8 ">
                <div className="space-y-8">
                    <ReturnButton href="/auth/login" label="Go to Login page now" />
                    <h1 className="text-3xl font-bold text-blue-600">Success! You have resent a verification link to your registered email.</h1>
                    {/* <RegisterForm /> */}

                </div>
            </div>

        </>
    )
}

export default Page;