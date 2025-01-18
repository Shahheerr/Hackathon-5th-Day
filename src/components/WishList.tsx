import Image from 'next/image'
import Gucci from "@/assets/Frame 606.png"
import Cooler from "@/assets/Frame 610.png"
import Controller from "@/assets/Frame 608 (2).png"
import Jacket from "@/assets/Frame 608 (3).png"
import { IoEyeOutline } from 'react-icons/io5'
import Laptop from "@/assets/Frame 604 (2).png"
import RedController from "@/assets/g92-2-500x500 1.png"
import Monitor from "@/assets/g27cq4-500x500 1.png"
import Keyboard from "@/assets/ak-900-01-500x500 1.png"

interface Product {
    id: number
    name: string
    price: number
    originalPrice?: number
    discount?: number
    image: string | StaticImageData
    showCart: boolean
    isNew?: boolean
}

const products: Product[] = [
    {
        id: 1,
        name: "Gucci duffle bag",
        price: 960,
        originalPrice: 1160,
        discount: 30,
        image: Gucci,
        showCart: true
    },
    {
        id: 2,
        name: "RGB liquid CPU Cooler",
        price: 1960,
        image: Cooler,
        showCart: true
    },
    {
        id: 3,
        name: "GP11 Shooter USB Gamepad",
        price: 550,
        image: Controller,
        showCart: true
    },
    {
        id: 4,
        name: "Quilted Satin Jacket",
        price: 750,
        image: Jacket,
        showCart: true
    }
]

interface SuggestionProduct {
    id: number
    name: string
    price: number
    rating: number
    discount?: number
    reviews: number
    image: string | unknown
    isNew?: boolean
    colors?: string[]
    showCart: boolean
}

const SuggestionProducts: SuggestionProduct[] = [
    {
        id: 5,
        name: "ASUS FHD Gaming Laptop",
        price: 690,
        rating: 5,
        reviews: 65,
        image: Laptop,
        discount: 35,
        showCart: true
    },
    {
        id: 6,
        name: "IPS LCD Gaming Monitor",
        price: 1160,
        rating: 5,
        reviews: 65,
        image: Monitor,
        showCart: true
    },
    {
        id: 7,
        name: "HAVIT HV-G92 Gamepad",
        price: 560,
        rating: 5,
        reviews: 65,
        image: RedController,
        showCart: true,
        isNew: true
    },
    {
        id: 8,
        name: "AK-900 Wired Keyboard",
        price: 200,
        rating: 5,
        reviews: 65,
        image: Keyboard,
        showCart: true
    },
]

function WishlistSection() {
    return (
        <div className="max-w-full mx-[80px] px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-medium">
                    Wishlist <span className="text-gray-600">({products.length})</span>
                </h1>
                <button className="px-4 py-2 border-2 border-gray-300 rounded hover:bg-gray-100 transition-colors">
                    Move All To Bag
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="group relative bg-[#F5F5F5] rounded-[4px]">
                        {product.isNew && (
                            <span className="absolute top-3 left-3 bg-[#00FF66] text-white text-sm px-3 py-1 rounded-[4px] font-medium z-10">
                                NEW
                            </span>
                        )}
                        {product.discount && (
                            <span className="absolute top-3 left-3 bg-[#DB4444] text-white text-sm px-3 py-1 rounded-[4px] font-medium z-10">
                                -{product.discount}%
                            </span>
                        )}
                        <div className="relative aspect-square w-full p-4 group">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain mix-blend-multiply"
                            />
                            <button className="absolute top-3 right-3 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                                </svg>
                            </button>
                            {product.showCart && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black text-white py-2 text-center cursor-pointer">
                                    Add To Cart
                                </div>
                            )}
                        </div>

                        <div className="p-4 bg-white rounded-b-[4px]">
                            <h3 className="font-medium mb-2">{product.name}</h3>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[#DB4444] font-medium">${product.price}</span>
                                {product.originalPrice && (
                                    <span className="text-gray-500 line-through text-sm">
                                        ${product.originalPrice}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
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
                        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
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

function ExploreProducts() {
    return (
        <div className="max-w-full mx-[80px] px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-8 rounded-[4px] bg-[#DB4444]" />
                    <span className="text-black font-normal text-xl font-poppins">Just For You</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <button className="px-4 py-2 border-2 border-gray-300 rounded hover:bg-gray-100 transition-colors">
                        Move All To Bag
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SuggestionProducts.map((product) => (
                    <div key={product.id} className="group relative bg-[#F5F5F5] rounded-[4px]">
                        {product.isNew && (
                            <span className="absolute top-3 left-3 bg-[#00FF66] text-white text-sm px-3 py-1 rounded-[4px] font-medium z-10">
                                NEW
                            </span>
                        )}
                        {product.discount && (
                            <span className="absolute top-3 left-3 bg-[#DB4444] text-white text-sm px-3 py-1 rounded-[4px] font-normal z-10">
                                -{product.discount}%
                            </span>
                        )}
                        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                            <button className="p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                <IoEyeOutline className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="relative aspect-square w-full p-4 group">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain mix-blend-multiply"
                            />
                            {product.showCart && (
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-black text-white py-2 text-center cursor-pointer"
                                >
                                    Add To Cart
                                </div>
                            )}
                        </div>

                        <div className="p-4 bg-white rounded-b-[4px]">
                            <h3 className="font-medium mb-2">{product.name}</h3>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[#DB4444] font-medium">${product.price}</span>
                            </div>
                            <StarRating rating={product.rating} reviews={product.reviews} />
                            {product.colors && (
                                <div className="flex gap-2 mt-2">
                                    {product.colors.map((color) => (
                                        <div
                                            key={color}
                                            className="w-5 h-5 rounded-full border border-gray-300"
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function WishListPage() {
    return (
        <div className='my-10'>
            <WishlistSection />
            <ExploreProducts />
        </div>
    )
}