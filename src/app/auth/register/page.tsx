
import { RegisterForm } from "@/my-components/register-form";

const Page = () => {
    return (
        <>
            <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8 ">
                <h1 className="text-3xl font-bold text-black">Register Here</h1>
                <RegisterForm />
            </div>

        </>
    )
}

export default Page;