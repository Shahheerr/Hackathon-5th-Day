"use client"
import Image from "next/image"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa"
import { useEffect, useState } from "react"
import { client } from "@/sanity/lib/client"
import { getAllProductsQuery } from "@/sanity/lib/queries"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import { Slide, ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface Product {
  _id: string
  title: string
  price: number
  rating: number
  ratingCount: number
  imageUrl: string
  image?: {
    asset: {
      url: string
    }
  }
  isNew?: boolean
  colors?: string[]
  tags?: string[]
}

export function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${index < rating ? "text-yellow-300" : "text-gray-300"}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}
      </div>
      <p className="text-sm text-gray-500">({reviews})</p>
    </div>
  )
}

export default function ExploreProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await client.fetch(getAllProductsQuery)
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>
  }

  const displayedProducts = products.slice(0, 8)

  return (
    <div className="max-w-[1170px] mx-auto px-4 py-8 bg-[#FFF]">
      <div className="flex flex-col mb-8">
        <div className="flex justify-between items-center">
          <div>
            <div className="w-[20px] h-[40px] bg-[#DB4444] rounded-[4px]"></div>
            <h4 className="text-[#DB4444] font-semibold mt-4">Our Products</h4>
            <h2 className="text-[36px] font-semibold mt-4">Explore Our Products</h2>
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
        {displayedProducts.map((product) => (
          <Link
            href={`/products/${product._id}`}
            key={product._id}
            className="group relative bg-[#F5F5F5] rounded-[4px]"
          >
            {product.tags &&
              product.tags.map((tag, index) => (
                <span
                  key={tag}
                  className={`absolute top-3 ${index === 0 ? "left-3" : "left-16"} bg-${tag === "NEW" ? "[#00FF66]" : "[#DB4444]"} text-white text-sm px-3 py-1 rounded-[4px] font-medium z-10`}
                >
                  {tag}
                </span>
              ))}
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
                <span className="text-[#DB4444] font-medium">${product.price.toFixed(2)}</span>
              </div>
              <StarRating rating={product.rating} reviews={product.ratingCount} />
              {product.colors && (
                <div className="flex gap-2 mt-2">
                  {product.colors.map((color) => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link
          href="/products"
          className="bg-[#DB4444] text-white px-12 py-4 rounded-[4px] hover:bg-[#E64444] transition-colors"
        >
          View All Products
        </Link>
      </div>
    </div>
  )
}

