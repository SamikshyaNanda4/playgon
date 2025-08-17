import AddGamerNameForm from '@/my-components/add-game-name-form'
import React from 'react'

const Page = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center -m-4 md:-m-6 overflow-x-hidden max-h-screen max-w-screen">
            <div>
                <AddGamerNameForm />
            </div>
        </div>
    )
}

export default Page