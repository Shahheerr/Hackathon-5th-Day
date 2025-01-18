'use client'

import Link from 'next/link'
import { useState } from 'react'

interface UserProfile {
    firstName: string
    lastName: string
    email: string
    address: string
}

export default function MyAccount() {
    const [profile, setProfile] = useState<UserProfile>({
        firstName: 'Md',
        lastName: 'Rimel',
        email: 'rimel1111@gmail.com',
        address: 'Kingston, 5236, United State'
    })

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setProfile(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Handle form submission logic here
        console.log('Profile updated:', profile)
        console.log('Password changed:', { currentPassword, newPassword, confirmPassword })
    }

    return (
        <div className="min-h-screen bg-white font-poppins">
            {/* Header */}
            <div className="max-w-[1170px] mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-gray-500 hover:text-gray-700">
                            Home
                        </Link>
                        <span className="text-gray-500">/</span>
                        <span>My Account</span>
                    </div>
                    <div className="text-sm">
                        Welcome! <span className="text-[#DB4444]">Md Rimel</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[1170px] mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Sidebar */}
                    <div className="w-64 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-base font-medium">Manage My Account</h2>
                            <div className="space-y-2 pl-4">
                                <div className="text-[#DB4444] font-normal">My Profile</div>
                                <div className="text-gray-600 font-normal">Address Book</div>
                                <div className="text-gray-600 font-normal">My Payment Options</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-base font-medium">My Orders</h2>
                            <div className="space-y-2 pl-4">
                                <div className="text-gray-600 font-normal">My Returns</div>
                                <div className="text-gray-600 font-normal">My Cancellations</div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-base font-medium">My WishList</h2>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="flex-1 max-w-3xl shadow-md px-[50px] py-12">
                        <h1 className="text-xl font-medium text-[#DB4444] mb-8">Edit Your Profile</h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-normal mb-2">First Name</label>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={profile.firstName}
                                        onChange={handleProfileChange}
                                        className="w-full p-3 bg-[#F5F5F5] rounded focus:outline-none shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-normal mb-2">Last Name</label>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={profile.lastName}
                                        onChange={handleProfileChange}
                                        className="w-full p-3 bg-[#F5F5F5] rounded focus:outline-none shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-normal mb-2">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={profile.email}
                                        onChange={handleProfileChange}
                                        className="w-full p-3 bg-[#F5F5F5] rounded focus:outline-none shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address" className="block text-sm font-normal mb-2">Address</label>
                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        value={profile.address}
                                        onChange={handleProfileChange}
                                        className="w-full p-3 bg-[#F5F5F5] rounded focus:outline-none shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-base font-normal">Password Changes</h2>
                                <div className="space-y-4">
                                    <input
                                        type="password"
                                        placeholder="Current Password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="w-full p-3 bg-[#F5F5F5] rounded focus:outline-none shadow-sm"
                                    />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full p-3 bg-[#F5F5F5] rounded focus:outline-none shadow-sm"
                                    />
                                    <input
                                        type="password"
                                        placeholder="Confirm New Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full p-3 bg-[#F5F5F5] rounded focus:outline-none shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <button
                                    type="button"
                                    className="px-8 py-2 shadow-sm rounded font-normal hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-2 bg-[#DB4444] text-white rounded font-normal hover:bg-opacity-90 transition-colors shadow-sm"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

