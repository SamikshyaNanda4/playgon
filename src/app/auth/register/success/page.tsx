import { ReturnButton } from "@/my-components/return-button";



const Page = () => {


    return (
        <>
            <div className="px-8 py-16  container mx-auto max-w-screen-lg space-y-8 ">
                <div className="space-y-8">
                    <ReturnButton href="/auth/login" label="Login page " />
                    <h1 className="text-3xl font-bold text-blue-600">Success! You have successfully registered.Please check you email to verify.</h1>
                    {/* <RegisterForm /> */}

                </div>
            </div>

        </>
    )
}

export default Page;