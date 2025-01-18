'use client'

import Image from 'next/image'
import { IoHeartOutline } from "react-icons/io5"
import { IoEyeOutline } from "react-icons/io5"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa"
import DogFood from "@/assets/Frame 604 (4).png"
import Camera from "@/assets/Frame 604 (1).png"
import Laptop from "@/assets/Frame 604 (2).png"
import Makeup from "@/assets/download.jpeg"
import Car from "@/assets/Frame 608 (4).png"
import Shoes from "@/assets/Frame 608 (1).png"
import Controller from "@/assets/Frame 608 (2).png"
import Jacket from "@/assets/Frame 608 (3).png"

interface Product {
  id: number
  name: string
  price: number
  rating: number
  reviews: number
  image: string | unknown
  isNew?: boolean
  colors?: string[]
  showCart: boolean
}

const products: Product[] = [
  {
    id: 1,
    name: "Breed Dry Dog Food",
    price: 100,
    rating: 3,
    reviews: 35,
    image: DogFood,
    showCart: true
  },
  {
    id: 2,
    name: "CANON EOS DSLR Camera",
    price: 360,
    rating: 4,
    reviews: 95,
    image: Camera,
    showCart: true
  },
  {
    id: 3,
    name: "ASUS FHD Gaming Laptop",
    price: 700,
    rating: 5,
    reviews: 325,
    image: Laptop,
    showCart: true
  },
  {
    id: 4,
    name: "Curology Product Set",
    price: 500,
    rating: 4,
    reviews: 145,
    image: Makeup,
    showCart: true
  },
  {
    id: 5,
    name: "Kids Electric Car",
    price: 960,
    rating: 5,
    reviews: 65,
    image: Car,
    isNew: true,
    colors: ['#000000', '#DB4444'],
    showCart: true
  },
  {
    id: 6,
    name: "Jr. Zoom Soccer Cleats",
    price: 1160,
    rating: 5,
    reviews: 35,
    image: Shoes,
    colors: ['#EEFF61', '#DB4444'],
    showCart: true
  },
  {
    id: 7,
    name: "GP11 Shooter USB Gamepad",
    price: 660,
    rating: 5,
    reviews: 65,
    image: Controller,
    isNew: true,
    colors: ['#000000', '#DB4444'],
    showCart: true
  },
  {
    id: 8,
    name: "Quilted Satin Jacket",
    price: 660,
    rating: 4,
    reviews: 55,
    image: Jacket,
    colors: ['#184A48', '#DB4444'],
    showCart: true
  },
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

export default function ExploreProducts() {
  return (
    <div className="max-w-full mx-[80px] px-4 py-8">
      <div className="flex flex-col mb-8">
        <div className="flex items-center gap-2">
          <div className="w-5 h-8 rounded-[4px] bg-[#DB4444]" />
          <span className="text-[#DB4444] font-medium">Our Products</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <h2 className="text-3xl font-bold">Explore Our Products</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-full border hover:bg-gray-100">
              <FaChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full border hover:bg-gray-100">
              <FaChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="group relative bg-[#F5F5F5] rounded-[4px]">
            {product.isNew && (
              <span className="absolute top-3 left-3 bg-[#00FF66] text-white text-sm px-3 py-1 rounded-[4px] font-medium z-10">
                NEW
              </span>
            )}
            <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
              <button className="p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <IoHeartOutline className="w-5 h-5" />
              </button>
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
                  className="absolute bottom-0 left-0 right-0 bg-black text-white py-2 text-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
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

      <div className="flex justify-center mt-8">
        <button className="bg-[#DB4444] text-white px-8 py-3 rounded-[4px] hover:bg-opacity-90">
          View All Products
        </button>
      </div>
    </div>
  )
}

