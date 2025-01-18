'use client';

import Image from 'next/image';
import { CartItemProps } from './types';

/**
 * CartItem component displays individual items in the cart
 * with quantity controls and remove functionality
 */
export const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
    return (
        <div className="flex items-center gap-4 border-b py-4">
            <div className="relative h-24 w-24">
                <Image 
                    src={item.image as string}
                    alt={item.name}
                    fill
                    className="object-contain"
                />
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                    <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 border rounded"
                        disabled={item.quantity <= 1}
                    >
                        -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 border rounded"
                    >
                        +
                    </button>
                </div>
            </div>
            <button 
                onClick={() => onRemove(item.id)}
                className="text-red-500 hover:text-red-700"
            >
                Remove
            </button>
        </div>
    );
};
