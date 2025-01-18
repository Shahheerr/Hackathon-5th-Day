'use client'

import Image from 'next/image'
import { IoHeartOutline } from "react-icons/io5"
import { IoEyeOutline } from "react-icons/io5"
import jacket from "@/assets/Frame 605.png"
import bag from "@/assets/Frame 606.png"
import cooler from "@/assets/Frame 610.png"
import bookshelf from "@/assets/Frame 612.png"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string | unknown
  showCart: boolean
}

const products: Product[] = [
  {
    id: 1,
    name: "The north coat",
    price: 260,
    originalPrice: 360,
    rating: 5,
    reviews: 65,
    image: jacket,
    showCart: true
  },
  {
    id: 2,
    name: "Gucci duffle bag",
    price: 960,
    originalPrice: 1160,
    rating: 5,
    reviews: 65,
    image: bag,
    showCart: true
  },
  {
    id: 3,
    name: "RGB liquid CPU Cooler",
    price: 160,
    originalPrice: 170,
    rating: 5,
    reviews: 65,
    image: cooler,
    showCart: true
  },
  {
    id: 4,
    name: "Small BookSelf",
    price: 360,
    rating: 5,
    reviews: 65,
    image: bookshelf,
    showCart: true
  }
]

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

export default function BestSelling() {
  return (
    <div className="max-w-[1170px] mx-auto px-4 py-8">
      <div className="flex flex-col mb-8">
        <div className="flex items-center gap-2">
          <div className="w-5 h-8 bg-[#DB4444] rounded-[4px]" />
          <span className="text-[#DB4444] font-medium">This Month</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mt-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Best Selling Products</h2>
          <button className="w-full sm:w-auto px-8 py-3 bg-[#DB4444] text-white rounded hover:bg-opacity-90 transition-colors">
            View All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
              <button className="p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <IoHeartOutline className="w-5 h-5" />
              </button>
              <button className="p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <IoEyeOutline className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-square w-full p-2 sm:p-4 group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain mix-blend-multiply"
              />
              {product.showCart && (
                <div
                  className="absolute bottom-0 left-0 right-0 bg-black text-white py-2 text-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Add To Cart
                </div>
              )}
            </div>
            <h3 className="font-medium text-sm sm:text-base mb-2 truncate">{product.name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#DB4444] font-medium">${product.price}</span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through text-sm">${product.originalPrice}</span>
              )}
            </div>
            <StarRating rating={product.rating} reviews={product.reviews} />
          </div>
        ))}
      </div>
      <div className="w-full h-px bg-gray-200 mt-12 sm:mt-16 lg:mt-20" />
    </div>
  )
}

