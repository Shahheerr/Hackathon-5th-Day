'use client'
import Image from 'next/image'
import { IoHeartOutline, IoEyeOutline } from "react-icons/io5"
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/client'
import { getBestSellingProductsQuery } from '@/sanity/lib/queries'

interface Product {
    _id: string
    title: string
    price: number
    oldPrice?: number
    discountPercentage?: number
    rating: number
    ratingCount: number
    imageUrl: string
    image?: {
        asset: {
            url: string
        }
    }
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
                            i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
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

export default function RelatedItems({ category }: { category: string }) {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        async function fetchRelatedProducts() {
            try {
                const relatedProducts = await client.fetch(getBestSellingProductsQuery)
                setProducts(relatedProducts)
            } catch (error) {
                console.error("Error fetching related products:", error)
            }
        }
        fetchRelatedProducts()
    }, [category])

    return (
        <div className="max-w-[1170px] mx-auto px-4 md:px-6 py-8">
            <div className="flex flex-col mb-8">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-8 bg-[#DB4444] rounded-[4px]" />
                    <span className="text-[#DB4444] font-medium">Related Items</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product) => (
                    <div key={product._id} className="group relative bg-white p-2 md:p-4">
                        <div className="relative aspect-square w-full">
                            <Image
                                src={product.image?.asset.url || product.imageUrl}
                                alt={product.title}
                                fill
                                className="object-contain mix-blend-multiply"
                            />
                            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors">
                                    <IoHeartOutline className="w-5 h-5" />
                                </button>
                                <button className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors">
                                    <IoEyeOutline className="w-5 h-5" />
                                </button>
                            </div>
                            {product.discountPercentage && product.discountPercentage > 0 && (
                                <span className="absolute top-2 left-2 bg-[#DB4444] text-white text-xs px-2 py-1 rounded">
                                    -{product.discountPercentage}%
                                </span>
                            )}
                        </div>
                        <h3 className="font-medium mb-2 text-sm md:text-base truncate">{product.title}</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-[#DB4444] font-medium">${product.price.toFixed(2)}</span>
                            {product.oldPrice && product.oldPrice > product.price && (
                                <span className="text-gray-500 line-through text-sm">
                                    ${product.oldPrice.toFixed(2)}
                                </span>
                            )}
                        </div>
                        <StarRating rating={product.rating} reviews={product.ratingCount} />
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <button className="bg-[#DB4444] text-white px-8 py-3 rounded hover:bg-opacity-90 transition-colors">
                    View All Products
                </button>
            </div>
        </div>
    )
}

