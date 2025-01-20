'use client';

import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';

// Define the types
interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string | unknown;
}

interface CartState {
    cartItems: CartItem[];
}

interface CartContextType {
    cart: CartItem[];
    addItem: (item: CartItem) => void;
    updateQuantity: (id: number, newQuantity: number) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    getTotal: () => string; // Total as a formatted string
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Reducer function
const cartReducer = (state: CartState, action: any): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.cartItems.find((item) => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((item) =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + action.payload.quantity }
                            : item
                    ),
                };
            }
            return { ...state, cartItems: [...state.cartItems, action.payload] };
        }
        case 'UPDATE_QUANTITY': {
            const updatedItems = state.cartItems.map((item) =>
                item.id === action.payload.id
                    ? { ...item, quantity: Math.max(1, action.payload.newQuantity) }
                    : item
            );
            return { ...state, cartItems: updatedItems };
        }

        case 'REMOVE_ITEM':
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== action.payload.id),
            };
        case 'CLEAR_CART':
            return { ...state, cartItems: [] };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

// Context Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });

    // Load cart from localStorage on initial load
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const parsedCart: CartItem[] = JSON.parse(savedCart);
            parsedCart.forEach((item) => {
                // Ensure cart state is updated correctly with the saved items
                dispatch({ type: 'ADD_ITEM', payload: item });
            });
        }
    }, []);

    // Save cart to localStorage whenever the cart changes
    useEffect(() => {
        if (state.cartItems.length > 0) {
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
        } else {
            localStorage.removeItem('cart');
        }
    }, [state.cartItems]);

    const addItem = (item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item });

    const updateQuantity = (id: number, newQuantity: number) =>
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, newQuantity } });

    const removeItem = (id: number) => dispatch({ type: 'REMOVE_ITEM', payload: { id } });

    const clearCart = () => dispatch({ type: 'CLEAR_CART' });

    const getTotal = () => {
        const total = state.cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        return total.toFixed(2); // Ensure 2 decimal places
    };

    return (
        <CartContext.Provider
            value={{
                cart: state.cartItems,
                addItem,
                updateQuantity,
                removeItem,
                clearCart,
                getTotal, // Expose the total calculation
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom Hook
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
