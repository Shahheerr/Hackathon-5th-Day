'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AccountPage() {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn')
        if (isLoggedIn !== 'true') {
            router.push('/sign-in')
            router.refresh();
        } else{
            setTimeout(() => {
                setIsLoggedIn(true)
                router.push('/')
            }, 5000)
        }
    }, [router])

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false')
        router.push('/sign-in')
    }

    return (
        <div className="max-w-7xl mx-auto min-h-screen my-16 p-8">
            <h1 className="text-3xl font-medium mb-6">Welcome to Your Account</h1>
            <p className="mb-4">This is your account page. You can only see this when you're logged in.</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

