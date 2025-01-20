'use client'

import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { getAllProductsQuery } from '@/sanity/lib/queries';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Link } from 'lucide-react';
import { StarRating } from './ExploreProduct';
import { IoEyeOutline, IoHeartOutline } from 'react-icons/io5';
import { useWishlist } from '@/context/WishListContext';

interface Product {
  tags: any;
  oldPrice: any;
  ratingCount: number;
  rating: number;
  _id: string;
  title: string;
  price: number;
  stock: number;
  imageUrl: string;
  image?: {
    asset: {
      url: string;
    }
  };
}

export default function ProductListing() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToWishlist } = useWishlist();
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await client.fetch(getAllProductsQuery);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link href={`/products/${product._id}`} key={product._id} className="group relative bg-[#F5F5F5] rounded-[4px]">
          {product.tags?.includes('new') && (
            <span className="absolute top-3 left-3 bg-[#00FF66] text-white text-sm px-3 py-1 rounded-[4px] font-medium z-10">
              NEW
            </span>
          )}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="bg-white w-[34px] h-[34px] flex items-center justify-center rounded-full hover:bg-gray-100">
              <IoHeartOutline onClick={(e) => {
                e.preventDefault()
                addToWishlist({
                  id: product._id, // Ensure id is a number
                  name: product.title,
                  price: product.price,
                  quantity: 1,
                  image: product.image?.asset.url || product.imageUrl,
                });
              }} className="w-5 h-5" />
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
                e.preventDefault();
                addToCart({
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
          </div>

          <div className="p-4 bg-white rounded-b-[4px]">
            <h3 className="font-medium mb-2 truncate">{product.title}</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#DB4444] font-medium">${product.price}</span>
              {product.oldPrice && (
                <span className="text-gray-500 line-through">${product.oldPrice}</span>
              )}
            </div>
            <StarRating rating={product.rating} reviews={product.ratingCount} />
          </div>
        </Link>
      ))}
    </div>
  );
}
