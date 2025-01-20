'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Product {
    imageUrl: any;
    _id: any;
    title: any;
    title: ReactI18NextChildren | Iterable<ReactI18NextChildren>;
    oldPrice: React.JSX.Element;
    rating: number;
    ratingCount: number;
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    image: string | StaticImageData;
    showCart: boolean;
    isNew?: boolean;
}

interface WishlistContextProps {
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (id: number) => void;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
    const [wishlist, setWishlist] = useState<Product[]>([]);

    // Load wishlist from localStorage when the component mounts
    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
        }
    }, []);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        if (wishlist.length > 0) {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        } else {
            localStorage.removeItem('wishlist');
        }
    }, [wishlist]);

    const addToWishlist = (product: Product) => {
        // Check if the product already exists in the wishlist
        if (!wishlist.some(item => item.id === product.id)) {
            setWishlist((prev) => [...prev, product]);  // Add product if not already in the wishlist
        }
    };

    const removeFromWishlist = (id: number) => {
        setWishlist((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
