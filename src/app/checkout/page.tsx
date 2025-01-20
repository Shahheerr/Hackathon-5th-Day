"use client"

import type React from "react"
import { useState } from "react"
import { useCart } from "@/context/CartContext"
import { useRouter } from "next/navigation"

const Checkout = () => {
    const { cart, getTotal, clearCart } = useCart()
    const router = useRouter()

    const [userInfo, setUserInfo] = useState({
        fullName: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    const handleCheckout = async () => {
        if (!userInfo.fullName || !userInfo.email || !userInfo.address) {
            alert("Please fill in all required fields.")
            return
        }

        const orderData = {
            userInfo,
            cartItems: cart,
            totalAmount: getTotal(),
        }

        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            })

            const result = await response.json()

            if (response.ok) {
                alert("Order placed successfully!")
                clearCart()
                router.push("/")
            } else {
                console.error("Error response:", result)
                alert(result.message || "Something went wrong. Please try again.")
            }
        } catch (error) {
            console.error("Error during checkout:", error)
            alert("Error placing the order. Please try again.")
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl my-12">
            <h1 className="text-3xl font-extrabold mb-8 text-gray-800 border-b pb-4">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="cart-items">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">Your Cart</h2>
                    {cart.length > 0 ? (
                        <ul className="space-y-4">
                            {cart.map((item) => (
                                <li key={item.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                        <p className="text-gray-600">
                                            {item.quantity} x ${item.price}
                                        </p>
                                    </div>
                                    <p className="font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 italic">Your cart is empty.</p>
                    )}

                    <div className="mt-8 bg-gray-100 p-4 rounded-lg">
                        <h3 className="text-xl font-bold text-gray-800">
                            Total: <span className="text-green-600">${getTotal()}</span>
                        </h3>
                    </div>
                </div>

                <div className="user-info">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">Shipping Information</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={userInfo.fullName}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={userInfo.email}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            required
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={userInfo.address}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            required
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={userInfo.city}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                required
                            />
                            <input
                                type="text"
                                name="postalCode"
                                placeholder="Postal Code"
                                value={userInfo.postalCode}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                required
                            />
                        </div>
                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={userInfo.country}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            required
                        />
                    </div>
                </div>
            </div>

            <button
                onClick={handleCheckout}
                className="mt-12 w-full bg-blue-600 text-white py-4 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Place Order
            </button>
        </div>
    )
}

export default Checkout

