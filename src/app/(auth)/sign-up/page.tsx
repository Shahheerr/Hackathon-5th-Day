'use client'

import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import cartAndMobile from "@/assets/dl.beatsnoop 1.png"
import google from "@/assets/Icon-Google.png"

export default function SignupPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const userData = { name, email, password }
        localStorage.setItem('userData', JSON.stringify(userData))
        localStorage.setItem('isLoggedIn', 'false')
        router.push('/sign-in')
    }

    return (
        <div className="max-w-7xl mx-auto min-h-screen my-20 mr-20 w-full flex flex-col lg:flex-row">
            {/* Left Section with Image */}
            <div className="w-full lg:w-1/2 bg-[#CBE4E8] flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-square">
                    <Image
                        src={cartAndMobile || "/placeholder.svg"}
                        alt="Shopping cart with phone and shopping bags"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Right Section with Form */}
            <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
                <div className="w-full max-w-md space-y-8">
                    <div className="space-y-2 text-center lg:text-left">
                        <h1 className="text-3xl font-medium mb-3">Create an account</h1>
                        <p className="text-black font-poppins font-normal text-base">Enter your details below</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full mb-3 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full my-3 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full my-3 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            className="w-full font-medium font-poppins text-base bg-[#e74c3c] hover:bg-[#DB4444] text-[#FAFAFA] py-4 px-36 rounded-[4px] transition-colors"
                            type="submit"
                        >
                            Create Account
                        </button>

                        <button
                            type="button"
                            className="w-full border font-poppins font-normal text-base text-black py-4 px-28 rounded-[4px] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                        >
                            <Image
                                src={google || "/placeholder.svg"}
                                alt="Google logo"
                                width={20}
                                height={20}
                                className="w-5 h-5"
                            />
                            Sign up with Google
                        </button>
                    </form>

                    <div className="text-center">
                        <span className="text-black text-base font-normal font-poppins">Already have an account? </span>
                        <Link
                            href="/login"
                            className="text-black text-base font-poppins border-b border-black hover:underline font-medium"
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

