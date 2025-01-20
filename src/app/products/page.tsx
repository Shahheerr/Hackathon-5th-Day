"use client"

import { useEffect, useState } from "react"
import { client } from "@/sanity/lib/client"
import { getAllProductsQueryALL, getUniqueCategoriesQueryALL } from "@/sanity/lib/queries"
import Image from "next/image"
import { IoHeartOutline, IoEyeOutline } from "react-icons/io5"
import { StarRating } from "@/components/ExploreProduct"
import { useSearchParams, useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import Link from "next/link"
import { useWishlist } from "@/context/WishListContext"
import { Slide, ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface Product {
  _id: string
  title: string
  category: string
  price: number
  oldPrice?: number
  rating: number
  ratingCount: number
  tags: string[]
  stock: number
  imageUrl: string
  discountPercentage?: number
  description: string
  specifications?: Record<string, string>
}

const sortOptions = [
  { label: "Latest", value: "latest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Rating: High to Low", value: "rating_desc" },
  { label: "Most Reviewed", value: "reviews_desc" },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()
  const { addItem } = useCart()
  const { addToWishlist } = useWishlist()

  const category = searchParams.get("category")
  const sort = searchParams.get("sort") || "latest"
  const tag = searchParams.get("tag")

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await client.fetch(getUniqueCategoriesQueryALL)
        setCategories(Array.from(new Set(data))) // Remove duplicates
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await client.fetch(getAllProductsQueryALL)
        let filteredProducts = [...data]

        // Apply category filter
        if (category) {
          filteredProducts = filteredProducts.filter((p) => p.category === category)
        }

        // Apply tag filter
        if (tag) {
          filteredProducts = filteredProducts.filter((p) => p.tags && p.tags.includes(tag))
        }

        // Apply sorting
        switch (sort) {
          case "price_asc":
            filteredProducts.sort((a, b) => a.price - b.price)
            break
          case "price_desc":
            filteredProducts.sort((a, b) => b.price - a.price)
            break
          case "rating_desc":
            filteredProducts.sort((a, b) => b.rating - a.rating)
            break
          case "reviews_desc":
            filteredProducts.sort((a, b) => b.ratingCount - a.ratingCount)
            break
          default: // 'latest'
            // Products are already in latest order from Sanity
            break
        }

        setProducts(filteredProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category, sort, tag])

  const updateFilter = (type: "category" | "sort" | "tag", value: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    if (!value) {
      current.delete(type)
    } else {
      current.set(type, value)
    }

    const search = current.toString()
    const query = search ? `?${search}` : ""

    router.push(`/products${query}`)
  }

  if (loading) {
    return (
      <div className="max-w-full mx-[80px] px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-gray-200 rounded-md aspect-square"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-full mx-[80px] px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">All Products</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={category || ""}
            onChange={(e) => updateFilter("category", e.target.value || null)}
            className="px-4 py-2 border rounded-md bg-white"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => updateFilter("sort", e.target.value)}
            className="px-4 py-2 border rounded-md bg-white"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No products found</p>
        </div>
      ) : (
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
                      className="bg-[#00FF66] text-white text-sm px-3 py-1 rounded-[4px] font-medium cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault()
                        updateFilter("tag", tag)
                      }}
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
                        id: product._id,
                        name: product.title,
                        price: product.price,
                        quantity: 1,
                        image: product.imageUrl,
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
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-contain mix-blend-multiply p-2"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    addItem({
                      id: product._id,
                      name: product.title,
                      price: product.price,
                      quantity: 1,
                      image: product.imageUrl,
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
                  <span className="text-[#DB4444] font-medium">${product.price}</span>
                  {product.oldPrice && <span className="text-gray-500 line-through">${product.oldPrice}</span>}
                </div>
                <StarRating rating={product.rating} reviews={product.ratingCount} />
              </div>
            </Link>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  )
}

