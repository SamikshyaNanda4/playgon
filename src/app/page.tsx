import { GetStartedButton } from "@/my-components/get-started-button"
export default function Page() {
    return (
        <>
            <div className="flex items-center justify-center h-dvh">

                <div className="flex justify-center gap-2 flex-col items-center ">

                    <h1 className="text-8xl font-bold">Playgon</h1>
                    <GetStartedButton />
                </div>
            </div>
        </>
    )
}