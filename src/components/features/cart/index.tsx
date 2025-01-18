'use client';

import { useState } from 'react';
import { CartItem as CartItemType } from './types';
import { CartItem } from './CartItem';
import { calculateTotal } from './utils';

/**
 * Main Cart component that manages the shopping cart functionality
 * Handles cart items state and provides methods for updating quantities
 */
export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItemType[]>([
        // Initial cart items can be loaded from API or local storage
    ]);

    /**
     * Updates the quantity of an item in the cart
     */
    const handleUpdateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    /**
     * Removes an item from the cart
     */
    const handleRemoveItem = (id: number) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const total = calculateTotal(cartItems);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
            
            {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
            ) : (
                <>
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onUpdateQuantity={handleUpdateQuantity}
                                onRemove={handleRemoveItem}
                            />
                        ))}
                    </div>

                    <div className="mt-6 border-t pt-4">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-medium">Total:</span>
                            <span className="text-xl font-bold">${total}</span>
                        </div>
                        <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
