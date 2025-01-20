'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const { cart, updateQuantity, removeItem } = useCart();

    // Round off subtotal and total to avoid decimal points
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 0; // Free shipping
    const total = subtotal + shipping;
    console.log(cart);

    // Function to round off numbers to 2 decimal places
    const roundToTwoDecimals = (value: number) => Math.round(value * 100) / 100;

    const router = useRouter()

    function handleCheckout(){
        router.push('/checkout')
    }

    return (
        <div className="max-w-full mx-[80px] px-4 py-8 font-poppins">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-10">
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                    Home
                </Link>
                <span className="text-gray-500">/</span>
                <span>Cart</span>
            </div>

            {/* Cart Table */}
            <div className="mb-8">
                <div className="grid grid-cols-5 gap-4 pb-4 shadow-sm rounded-[4px] p-4">
                    <div>Product</div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <div>Subtotal</div>
                    <div>Actions</div>
                </div>

                {cart.map((item) => (
                    <div
                        key={item.id}
                        className="grid grid-cols-5 gap-4 py-8 shadow-sm rounded-[4px] p-4 items-center mb-4"
                    >
                        <div className="flex items-center gap-4">
                            {/* Close Button for removing item */}
                            <button
                                onClick={() => removeItem(item.id)}
                                className="text-gray-400 hover:text-[#DB4444]"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <div className="relative w-16 h-16">
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                            </div>
                            <span className="font-normal">{item.name}</span>
                        </div>
                        <div className="font-normal">${roundToTwoDecimals(item.price)}</div>
                        <div>
                            <div className="inline-flex items-center border rounded">
                                <input
                                    type="text"
                                    value={item.quantity.toString().padStart(2, '0')}
                                    className="w-12 text-center border-none focus:ring-0"
                                    readOnly
                                />
                                <div className="flex flex-col border-l">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="px-2 py-0.5 hover:bg-gray-100 border-b"
                                    >
                                        ⌃
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (item.quantity === 1) {
                                                removeItem(item.id); // Remove if quantity goes to 0
                                            } else {
                                                updateQuantity(item.id, item.quantity - 1);
                                            }
                                        }}
                                        className="px-2 py-0.5 hover:bg-gray-100"
                                    >
                                        ⌄
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="font-normal">${roundToTwoDecimals(item.price * item.quantity)}</div>
                        <div>
                            <button
                                onClick={() => removeItem(item.id)}
                                className="px-4 py-2 bg-[#DB4444] text-white rounded font-normal hover:bg-opacity-90 transition-colors"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Coupon and Cart Total */}
            <div className="flex justify-between gap-8">
                {/* Coupon Code */}
                <div className="flex gap-4 max-w-full">
                    <input
                        type="text"
                        placeholder="Coupon Code"
                        className="flex-1 w-[300px] h-14 px-4 py-3 border border-[#00000080] rounded focus:outline-none focus:ring-1 focus:ring-[#DB4444]"
                    />
                    <button className="px-8 py-3 w-[221px] h-14 bg-[#DB4444] text-white rounded font-normal hover:bg-opacity-90 transition-colors">
                        Apply Coupon
                    </button>
                </div>

                {/* Cart Totals */}
                <div className="w-[470px] border border-[#00000080] rounded p-6">
                    <h2 className="text-xl font-medium mb-6">Cart Total</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between pb-4 border-b border-black">
                            <span className="font-normal">Subtotal:</span>
                            <span className="font-normal">${roundToTwoDecimals(subtotal)}</span>
                        </div>
                        <div className="flex justify-between pb-4 border-b border-black">
                            <span className="font-normal">Shipping:</span>
                            <span className="font-normal">Free</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-normal">Total:</span>
                            <span className="font-normal">${roundToTwoDecimals(total)}</span>
                        </div>
                        <button onClick={handleCheckout} className="w-full py-4 bg-[#DB4444] text-white rounded font-normal hover:bg-opacity-90 transition-colors mt-6">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
