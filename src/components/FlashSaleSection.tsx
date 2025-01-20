"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { IoHeartOutline } from "react-icons/io5"
import { IoEyeOutline } from "react-icons/io5"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa"
import { client } from "@/sanity/lib/client"
import { getFlashSaleProductsQuery } from "@/sanity/lib/queries"
import Link from "next/link"
import { StarRating } from "./ExploreProduct"
import { useCart } from "@/context/CartContext"
import { useWishlist } from "@/context/WishListContext"
import { Slide, ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface Product {
  _id: string
  title: string
  price: number
  oldPrice: number
  discountPercentage: number
  rating: number
  ratingCount: number
  imageUrl: string
  image?: {
    asset: {
      url: string
    }
  }
  tags?: string[]
  showCart?: boolean // Add this here
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
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
        <div className="bg-white rounded-[4px] w-[62px] h-[62px] flex items-center justify-center">
          <span className="text-2xl font-semibold">{timeLeft.days}</span>
        </div>
        <span className="text-xs mt-1">Days</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-white rounded-[4px] w-[62px] h-[62px] flex items-center justify-center">
          <span className="text-2xl font-semibold">{timeLeft.hours}</span>
        </div>
        <span className="text-xs mt-1">Hours</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-white rounded-[4px] w-[62px] h-[62px] flex items-center justify-center">
          <span className="text-2xl font-semibold">{timeLeft.minutes}</span>
        </div>
        <span className="text-xs mt-1">Minutes</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-white rounded-[4px] w-[62px] h-[62px] flex items-center justify-center">
          <span className="text-2xl font-semibold">{timeLeft.seconds}</span>
        </div>
        <span className="text-xs mt-1">Seconds</span>
      </div>
    </div>
  )
}

export default function FlashSales() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()
  const { addToWishlist } = useWishlist()

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await client.fetch(getFlashSaleProductsQuery)
        setProducts(data)
      } catch (error) {
        console.error("Error fetching flash sale products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>
  }

  return (
    <div className="max-w-[1170px] mx-auto px-4 py-8 bg-[#FFF]">
      <div className="flex flex-col mb-8">
        <div className="flex items-center gap-2">
          <div className="w-5 h-8 bg-[#DB4444] rounded-[4px]" />
          <span className="text-[#DB4444] font-medium">Today's</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <h2 className="text-2xl sm:text-3xl font-bold">Flash Sales</h2>
            <CountdownTimer />
          </div>
          <div className="flex gap-2">
            <button className="bg-[#F5F5F5] w-[46px] h-[46px] flex items-center justify-center rounded-full">
              <FaChevronLeft />
            </button>
            <button className="bg-[#F5F5F5] w-[46px] h-[46px] flex items-center justify-center rounded-full">
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            href={`/products/${product._id}`}
            key={product._id}
            className="group relative bg-[#F5F5F5] rounded-[4px]"
          >
            <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
              {product.tags &&
                product.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-white text-xs px-2 py-1 rounded-sm font-medium ${
                      tag.toLowerCase() === "new" ? "bg-[#00FF66]" : "bg-[#DB4444]"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
            </div>
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="bg-white w-[34px] h-[34px] flex items-center justify-center rounded-full hover:bg-gray-100">
                <IoHeartOutline
                  onClick={(e) => {
                    e.preventDefault()
                    addToWishlist({
                      id: product._id, // Ensure id is a number
                      name: product.title,
                      price: product.price,
                      quantity: 1,
                      image: product.image?.asset.url || product.imageUrl,
                    })

                    toast.success("Product added to wishlist ❤", {
                      position: "bottom-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: false,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      transition: Slide,
                    })
                  }}
                  className="w-5 h-5"
                />
              </button>
              <button className="bg-white w-[34px] h-[34px] flex items-center justify-center rounded-full hover:bg-gray-100">
                <IoEyeOutline className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-square w-full p-4 group">
              <Image
                src={product.image?.asset.url || product.imageUrl}
                alt={product.title}
                fill
                className="object-contain mix-blend-multiply p-2"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <button
                onClick={(e) => {
                  e.preventDefault()
                  addItem({
                    id: product._id, // Ensure id is a number
                    name: product.title,
                    price: product.price,
                    quantity: 1,
                    image: product.image?.asset.url || product.imageUrl,
                  })
                  toast.success("Product added to cart 🛒", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                  })
                }}
                className="absolute bottom-0 left-0 right-0 bg-black text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                Add to Cart
              </button>
            </div>

            <div className="p-4 bg-white rounded-b-[4px]">
              <h3 className="font-medium mb-2 truncate">{product.title}</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#DB4444] font-medium">
                  ${isNaN(product.price) ? "N/A" : product.price.toFixed(2)}
                </span>
                {product.oldPrice && !isNaN(product.oldPrice) && (
                  <span className="text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <StarRating rating={product.rating} reviews={product.ratingCount} />
                {product.discountPercentage > 0 && (
                  <span className="bg-[#DB4444] text-white text-sm px-2 py-1 rounded">
                    -{Math.round(product.discountPercentage)}%
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

