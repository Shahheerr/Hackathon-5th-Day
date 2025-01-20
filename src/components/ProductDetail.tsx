'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { client } from '@/sanity/lib/client';
import { getProductByIdQuery } from '@/sanity/lib/queries';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  sizes: string[];
  colors: string[];
  image?: {
    asset: {
      url: string;
    }
  };
}

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      async function fetchProduct() {
        try {
          const data = await client.fetch(getProductByIdQuery, { id });
          setProduct(data);
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      }

      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading product details...</div>;
  }

  if (!product) {
    return <div className="text-center py-10">Product not found.</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <Image
        src={product.image?.asset.url}
        alt={product.title}
        width={400}
        height={400}
        className="object-cover rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="text-lg font-bold text-[#DB4444] mt-2">${product.price}</p>
      <p className="mt-2">{product.description}</p>
      <div className="mt-4">
        <h3 className="font-medium">Available Sizes:</h3>
        <div className="flex gap-2 mt-2">
          {product.sizes.map((size) => (
            <span key={size} className="border border-gray-300 rounded px-2 py-1">{size}</span>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-medium">Available Colors:</h3>
        <div className="flex gap-2 mt-2">
          {product.colors.map((color) => (
            <div key={color} className="w-6 h-6 rounded-full" style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>
      <button
        onClick={() => addToCart({
          id: product._id,
          name: product.title,
          price: product.price,
          quantity: 1,
          image: product.image?.asset.url,
        })}
        className="mt-4 bg-[#DB4444] text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
