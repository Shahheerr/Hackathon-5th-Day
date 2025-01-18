'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { IoHeartOutline } from "react-icons/io5"
import { IoEyeOutline } from "react-icons/io5"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa"
import { cn } from '@/lib/utils'

interface Product {
    id: number
    name: string
    price: number
    originalPrice: number
    discount: number
    rating: number
    reviews: number
    image: string | unknown
    showCart: boolean
}

const products: Product[] = [
    {
        id: 1,
        name: "HAVIT HV-G92 Gamepad",
        price: 120,
        originalPrice: 160,
        discount: 40,
        rating: 5,
        reviews: 88,
        image: "/product1.jpg",
        showCart: false
    },
    {
        id: 2,
        name: "AK-900 Wired Keyboard",
        price: 960,
        originalPrice: 1160,
        discount: 35,
        rating: 4,
        reviews: 75,
        image: "/product2.jpg",
        showCart: false
    },
    {
        id: 3,
        name: "IPS LCD Gaming Monitor",
        price: 370,
        originalPrice: 400,
        discount: 30,
        rating: 5,
        reviews: 99,
        image: "/product3.jpg",
        showCart: false
    },
    {
        id: 4,
        name: "S-Series Comfort Chair",
        price: 375,
        originalPrice: 400,
        discount: 25,
        rating: 5,
        reviews: 99,
        image: "/product4.jpg",
        showCart: false
    }
]

function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState({
        days: 3,
        hours: 23,
        minutes: 19,
        seconds: 56,
    })

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 }
                }
                if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
                }
                if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
                }
                if (prev.days > 0) {
                    return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
                }
                return prev
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
                <span className="text-lg font-medium">{timeLeft.days}</span>
                <span className="text-sm text-gray-500">Days</span>
            </div>
            <span className="text-lg">:</span>
            <div className="flex flex-col items-center">
                <span className="text-lg font-medium">{timeLeft.hours}</span>
                <span className="text-sm text-gray-500">Hours</span>
            </div>
            <span className="text-lg">:</span>
            <div className="flex flex-col items-center">
                <span className="text-lg font-medium">{timeLeft.minutes}</span>
                <span className="text-sm text-gray-500">Minutes</span>
            </div>
            <span className="text-lg">:</span>
            <div className="flex flex-col items-center">
                <span className="text-lg font-medium">{timeLeft.seconds}</span>
                <span className="text-sm text-gray-500">Seconds</span>
            </div>
        </div>
    )
}

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={cn(
                            "w-4 h-4",
                            i < rating ? "text-yellow-400" : "text-gray-300"
                        )}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
            <span className="text-sm text-gray-500">({reviews})</span>
        </div>
    )
}

export default function FlashSales() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const slidesToShow = {
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4
    }

    const nextSlide = () => {
        setCurrentSlide((prev) => 
            prev + 1 >= Math.ceil(products.length / slidesToShow.xl) ? 0 : prev + 1
        )
    }

    const prevSlide = () => {
        setCurrentSlide((prev) =>
            prev - 1 < 0 ? Math.ceil(products.length / slidesToShow.xl) - 1 : prev - 1
        )
    }

    return (
        <div className="max-w-[1170px] mx-auto px-4 md:px-6 py-8">
            <div className="flex flex-col mb-8">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-8 bg-[#DB4444] rounded-[4px]" />
                    <span className="text-[#DB4444] font-medium">Today's</span>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center mt-4 gap-4 md:gap-0">
                    <h2 className="text-2xl md:text-3xl font-bold md:mr-32">Flash Sales</h2>
                    <div className="flex items-end gap-4 md:gap-6 md:ml-8 overflow-x-auto">
                        <CountdownTimer />
                    </div>
                    <div className="flex gap-2 md:ml-auto mt-4 md:mt-0">
                        <button
                            onClick={prevSlide}
                            className="p-2 rounded-full border hover:bg-gray-100"
                            suppressHydrationWarning
                        >
                            <FaChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-2 rounded-full border hover:bg-gray-100"
                            suppressHydrationWarning
                        >
                            <FaChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product) => (
                    <div key={product.id} className="group relative bg-white p-2 md:p-4">
                        <div className="relative aspect-square w-full p-2 md:p-4 group">
                            <Image
                                src={product.image as string}
                                alt={product.name}
                                fill
                                className="object-contain mix-blend-multiply"
                            />
                            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors"
                                    suppressHydrationWarning
                                >
                                    <IoHeartOutline className="w-5 h-5" />
                                </button>
                                <button
                                    className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors"
                                    suppressHydrationWarning
                                >
                                    <IoEyeOutline className="w-5 h-5" />
                                </button>
                            </div>
                            {product.discount > 0 && (
                                <span className="absolute top-2 left-2 bg-[#DB4444] text-white text-xs px-2 py-1 rounded">
                                    -{product.discount}%
                                </span>
                            )}
                        </div>
                        <h3 className="font-medium mb-2 text-sm md:text-base truncate">{product.name}</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-[#DB4444] font-medium">${product.price}</span>
                            {product.originalPrice > product.price && (
                                <span className="text-gray-500 line-through text-sm">
                                    ${product.originalPrice}
                                </span>
                            )}
                        </div>
                        <StarRating rating={product.rating} reviews={product.reviews} />
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <button
                    className="bg-[#DB4444] text-white px-8 py-3 rounded hover:bg-opacity-90 transition-colors"
                    suppressHydrationWarning
                >
                    View All Products
                </button>
            </div>
            <div className="w-full h-px bg-gray-200 mt-12 md:mt-20" />
        </div>
    )
}
