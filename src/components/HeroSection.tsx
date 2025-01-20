'use client'

import Link from "next/link";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";
import AppleBanner from "@/assets/hero_endframe__cvklg0xk3w6e_large 2.png";
import AppleLogo from "@/assets/1200px-Apple_gray_logo 1.png";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { getUniqueCategoriesQuery } from "@/sanity/lib/queries";

function CategorySidebar() {
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await client.fetch(getUniqueCategoriesQuery);
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                // Fallback categories in case of error
                setCategories([
                    "Electronics",
                    "Computers",
                    "Smart Home",
                    "Gaming",
                    "Accessories",
                    "Mobile Phones",
                    "Audio",
                    "Cameras",
                    "Wearables"
                ]);
            } finally {
                setLoading(false);
            }
        }

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="w-full lg:w-60 bg-white shadow-md rounded-md p-4">
                <div className="animate-pulse space-y-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="h-8 bg-gray-200 rounded"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full lg:w-60 bg-white shadow-md rounded-md overflow-x-auto">
            <nav className="flex lg:flex-col min-w-max lg:min-w-0">
                {categories.map((category, index) => (
                    <Link
                        key={index}
                        href={`/products?category=${encodeURIComponent(category)}`}
                        className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors border-r-2 border-transparent hover:border-gray-300 whitespace-nowrap"
                    >
                        <span>{category}</span>
                        <FaChevronRight className="h-4 w-4 text-gray-500 ml-2" />
                    </Link>
                ))}
            </nav>
        </div>
    );
}

function PromoBanner() {
    return (
        <div className="relative bg-black text-white rounded-md overflow-hidden mx-auto w-full h-[250px] sm:h-[300px] md:h-[344px]">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8">
                <div className="space-y-2 sm:space-y-3 lg:space-y-5">
                    <div className="flex items-center gap-2">
                        <Image
                            src={AppleLogo}
                            alt="Apple Logo"
                            width={20}
                            height={20}
                            className="w-8 h-8 sm:w-10 sm:h-11"
                        />
                        <span className="font-poppins font-normal text-sm sm:text-base">iPhone 14 Series</span>
                    </div>
                    <div className="space-y-1 lg:space-y-2">
                        <h2 className="text-xl sm:text-2xl lg:text-5xl font-bold">Up to 10%</h2>
                        <p className="text-xl sm:text-2xl lg:text-5xl font-bold">off Voucher</p>
                    </div>
                    <button className="mt-2 sm:mt-3 text-sm font-medium underline hover:no-underline">
                        Shop Now →
                    </button>
                </div>

                <div className="relative w-1/2 h-[150px] sm:h-[200px] lg:h-[300px]">
                    <Image
                        src={AppleBanner}
                        alt="iPhone 14"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
                {[0, 1, 2, 3, 4].map((index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${index === 1 ? "bg-white" : "bg-gray-500"}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default function HeroSection() {
    return (
        <main className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                <CategorySidebar />
                <div className="flex-1 w-full">
                    <PromoBanner />
                </div>
            </div>
        </main>
    );
}
