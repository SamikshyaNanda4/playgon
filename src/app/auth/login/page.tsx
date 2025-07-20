import { LoginForm } from "@/my-components/login-form";

const Page = () => {
    return (
        <>
            <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8 ">
                <div className="space-y-8"><h1 className="text-3xl font-bold text-black">Login Page Here</h1>
                    {/* <RegisterForm /> */}
                </div>
                <LoginForm />
            </div>

        </>
    )
}

export default Page;