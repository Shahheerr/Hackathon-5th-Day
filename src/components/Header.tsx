'use client'

import 'tailwindcss/tailwind.css'
import Image from "next/image"
import Logo from "@/assets/Logo.png"
import Link from "next/link"
import { IoSearch } from "react-icons/io5"
import { FaRegHeart } from "react-icons/fa"
import { MdOutlineShoppingCart } from "react-icons/md"
import { useState } from "react"
import { HiMenu } from "react-icons/hi"
import { IoClose } from "react-icons/io5"
import { FaRegUser } from "react-icons/fa"
import { usePathname } from "next/navigation" // To check the current path
import { User, ShoppingBag, CircleX, Star, LogOut } from "lucide-react" // Import Lucide icons

const TopHeader = () => {
    return (
        <div className="flex items-center justify-between w-full mx-auto h-auto md:h-12 bg-black text-white px-4 py-2 md:py-0">
            <h1 className="font-poppins text-xs md:text-sm font-normal text-center flex-1 leading-[18px] md:leading-[21px]">
                Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
                <span className="ml-2 font-semibold underline">ShopNow</span>
            </h1>
            <select
                className="bg-black text-white text-xs md:text-sm border-none focus:outline-none focus:ring-0"
            >
                <option value="en">English</option>
                <option value="esp">Español</option>
                <option value="fr">Français</option>
                <option value="ur">اردو</option>
            </select>
        </div>
    )
}

const LowerHeader = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const pathname = usePathname() // Get the current path
    const dropdownItems = [
        { label: "Manage My Account", icon: <User size={20} /> },
        { label: "My Order", icon: <ShoppingBag size={20} /> },
        { label: "My Cancellations", icon: <CircleX size={20} /> },
        { label: "My Reviews", icon: <Star size={20} /> },
        { label: "Logout", icon: <LogOut size={20} /> },
    ]

    return (
        <header className="text-gray-600 body-font px-4 pt-4 pb-3">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <div className="flex justify-between w-full md:w-auto">
                    <Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href={"/"}>
                        <Image src={Logo} alt="Logo" />
                    </Link>
                    <button
                        className="md:hidden text-gray-600 focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <IoClose className="h-6 w-6" />
                        ) : (
                            <HiMenu className="h-6 w-6" />
                        )}
                    </button>
                </div>
                <nav className={`${isMobileMenuOpen ? 'flex' : 'hidden'
                    } md:flex flex-col md:flex-row md:ml-auto md:mr-auto items-center text-base justify-center gap-4 md:gap-8 font-normal font-poppins text-black w-full md:w-auto mt-4 md:mt-0`}>
                    <Link
                        href={"/"}
                        className="hover:underline decoration-gray-500 decoration-2 transition ease-in-out duration-300 py-2 md:py-0"
                    >
                        Home
                    </Link>
                    <Link
                        href={"/contact"}
                        className="hover:underline decoration-gray-500 decoration-2 transition ease-in-out duration-300 py-2 md:py-0"
                    >
                        Contact
                    </Link>
                    <Link
                        href={"/about"}
                        className="hover:underline decoration-gray-500 decoration-2 transition ease-in-out duration-300 py-2 md:py-0"
                    >
                        About
                    </Link>
                    <Link
                        href={"/signup"}
                        className="hover:underline decoration-gray-500 decoration-2 transition ease-in-out duration-300 py-2 md:py-0"
                    >
                        Sign Up
                    </Link>
                </nav>

                <div className="flex items-center justify-center w-full md:w-auto mt-4 md:mt-0">
                    <div className="relative w-full md:w-[238px] h-[38px] mb-4 md:mb-0">
                        <input
                            type="text"
                            placeholder="What are you looking for?"
                            className="w-full h-full rounded py-[7px] pr-10 pl-3 bg-[#F5F5F5] text-gray-700 focus:outline-none text-sm"
                        />
                        <IoSearch className="size-[18px] absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                    <div className="flex items-center ml-4">
                        <FaRegHeart className="text-gray-600 text-xl mx-4 cursor-pointer" />
                        <MdOutlineShoppingCart className="text-gray-600 text-xl mx-4 cursor-pointer" />

                        {/* Show User Icon on /account page */}
                        {pathname === "/account" && (
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className={`p-2 rounded-full focus:outline-none transition-colors duration-300 ${isDropdownOpen ? 'bg-[#DB4444] text-white' : 'text-gray-600'
                                        }`}
                                >
                                    <FaRegUser className="text-xl" />
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-60 bg-white bg-opacity-70 backdrop-blur-md rounded-md shadow-lg py-1 z-50">
                                        {dropdownItems.map((item, index) => (
                                            <Link
                                                key={index}
                                                href="#"
                                                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:bg-opacity-50"
                                            >
                                                <span className="mr-3">{item.icon}</span>
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

const Header = () => {
    return (
        <>
            <TopHeader />
            <LowerHeader />
        </>
    )
}

export default Header
