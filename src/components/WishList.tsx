'use client'
import { useWishlist } from "@/context/WishListContext"; // Import the Wishlist context
import Image from "next/image";
import BestSelling from "./BestSelling";
import { useCart } from "@/context/CartContext";

interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    isNew?: boolean;
    rating: number;
    reviews: number;
    colors?: string[];
}

function WishlistSection() {
    const { wishlist, removeFromWishlist } = useWishlist();

    const { addItem } = useCart()

    return (
        <div className="max-w-full mx-[80px] px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-medium">
                    Wishlist <span className="text-gray-600">({wishlist.length})</span>
                </h1>
                <button className="px-4 py-2 border-2 border-gray-300 rounded hover:bg-gray-100 transition-colors">
                    Move All To Bag
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {wishlist.map((product) => (
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
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    addItem({
                                        id: product._id, // Ensure id is a number
                                        name: product.title,
                                        price: product.price,
                                        quantity: 1,
                                        image: product.image?.asset.url || product.imageUrl,
                                    });
                                }}
                                className="absolute bottom-0 left-0 right-0 bg-black text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={() => removeFromWishlist(product.id)}
                                className="absolute top-3 right-3 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                                </svg>
                            </button>
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
    );
}

export default function WishListPage() {
    return (
        <div className='my-10'>
            <WishlistSection />
            <BestSelling />
        </div>
    );
}
