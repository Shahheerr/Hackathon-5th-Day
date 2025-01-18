'use client'
import Link from "next/link"
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
    label: string
    href: string
    isLast?: boolean
}

interface BreadcrumbProps {
    items: BreadcrumbItem[]
}

function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            {items.map((item, index) => (
                <div key={item.href} className="flex items-center">
                    {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
                    {item.isLast ? (
                        <span className="text-gray-900">{item.label}</span>
                    ) : (
                        <Link
                            href={item.href}
                            className="hover:text-gray-900 transition-colors"
                        >
                            {item.label}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    )
}

import { Phone, Mail } from 'lucide-react'

const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact", isLast: true },
]

export default function ContactPage() {
    return (
        <main className="container mx-auto px-4 py-8">
            <Breadcrumb items={breadcrumbItems} />

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-8 shadow-md px-[50px] py-12">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-12 h-12 bg-[#DB4444] rounded-full flex items-center justify-center">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-xl font-medium">Call To Us</h2>
                        </div>
                        <p className="mb-2">We are available 24/7, 7 days a week.</p>
                        <p className="text-gray-600">Phone: +880161111122222</p>
                    </div>

                    <div className="border-t pt-8">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-12 h-12 bg-[#DB4444] rounded-full flex items-center justify-center">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-xl font-medium">Write To US</h2>
                        </div>
                        <p className="mb-2">Fill out our form and we will contact you within 24 hours.</p>
                        <p className="text-gray-600">Emails: customer@exclusive.com</p>
                        <p className="text-gray-600">Emails: support@exclusive.com</p>
                    </div>
                </div>

                <div className="shadow-md px-[50px] py-12">
                    <form className="space-y-4 ">
                        <div className="grid md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="Your Name *"
                                required
                                className="p-3 bg-gray-100 rounded-sm"
                            />
                            <input
                                type="email"
                                placeholder="Your Email *"
                                required
                                className="p-3 bg-gray-100 rounded-sm"
                            />
                            <input
                                type="tel"
                                placeholder="Your Phone *"
                                required
                                className="p-3 bg-gray-100 rounded-sm"
                            />
                        </div>
                        <textarea
                            placeholder="Your Message"
                            rows={8}
                            className="w-full p-3 bg-gray-100 rounded-sm"
                        ></textarea>
                        <div className="flex justify-end">
                            <button className="px-8 py-3 bg-[#DB4444] text-white rounded hover:bg-opacity-90 transition-colors">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

