import { CartItem } from './types';

/**
 * Calculates the total price of all items in the cart
 */
export const calculateTotal = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

/**
 * Formats the price according to the locale
 */
export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
};
