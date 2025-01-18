import Image from "next/image";
import Logo from "@/assets/Exclusive.png";
import QrCode from "@/assets/Qr Code.png";
import Playstore from "@/assets/GooglePlay.png";
import Appstore from "@/assets/AppStore.png";
import Link from "next/link";
import { RiFacebookLine, RiLinkedinLine } from "react-icons/ri";
import { TfiTwitter } from "react-icons/tfi";
import { FaInstagram } from "react-icons/fa";


export default function Footer() {
    return (
        <footer className="text-white body-font bg-black font-poppins">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap md:text-left text-center gap-y-16 gap-x-8">
                    {/* Logo and Subscribe Section */}
                    <div className="lg:w-1/6 md:w-1/2 w-full px-4">
                        <Image src={Logo} alt="Logo" className="mb-6" />
                        <nav className="list-none mb-10">
                            <li className="mb-4">
                                <Link href={"/"} className="text-white font-medium text-xl hover:text-gray-800">Subscribe</Link>
                            </li>
                            <li className="mb-4">
                                <Link href={"/"} className="text-white font-normal text-base hover:text-gray-800">Get 10% off your first order</Link>
                            </li>
                            <li className="mb-4">
                                <input type="text" className="p-2 w-full rounded text-black" placeholder="Enter your email" />
                            </li>
                        </nav>
                    </div>

                    {/* Support Section */}
                    <div className="lg:w-1/6 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-white tracking-widest text-xl mb-4">Support</h2>
                        <nav className="list-none mb-10">
                            <li className="mb-4">
                                <Link href={"/"} className="text-white hover:text-gray-800">
                                    111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link href={"/"} className="text-white hover:text-gray-800">exclusive@gmail.com</Link>
                            </li>
                            <li className="mb-4">
                                <Link href={"/"} className="text-white hover:text-gray-800">+88015-88888-9999</Link>
                            </li>
                        </nav>
                    </div>

                    {/* Account Section */}
                    <div className="lg:w-1/6 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-white tracking-widest text-xl mb-4">Account</h2>
                        <nav className="list-none">
                            {["My Account", "Login / Register", "Cart", "Wishlist", "Shop"].map((item, index) => (
                                <li key={index} className="mb-4">
                                    <Link href={"/"} className="text-white hover:text-gray-800">{item}</Link>
                                </li>
                            ))}
                        </nav>
                    </div>

                    {/* Quick Links Section */}
                    <div className="lg:w-1/6 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-white tracking-widest text-xl mb-4">Quick Link</h2>
                        <nav className="list-none">
                            {["Privacy Policy", "Terms Of Use", "FAQ", "Contact"].map((item, index) => (
                                <li key={index} className="mb-4">
                                    <Link href={"/"} className="text-white hover:text-gray-800">{item}</Link>
                                </li>
                            ))}
                        </nav>
                    </div>

                    {/* Download App Section */}
                    <div className="lg:w-1/6 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-white tracking-widest text-xl mb-4">Download App</h2>
                        <div className="flex items-start gap-4">
                            <Image src={QrCode} alt="QR Code" className="w-24" />
                            <div>
                                <Link href={"/"}>
                                    <Image src={Playstore} alt="Playstore" className="mb-4 w-28" />
                                </Link>
                                <Link href={"/"}>
                                    <Image src={Appstore} alt="Appstore" className="w-28" />
                                </Link>
                            </div>
                        </div>
                        <div className="flex justify-start mt-6 space-x-4">
                            {[RiFacebookLine, TfiTwitter, FaInstagram, RiLinkedinLine].map((Icon, index) => (
                                <Link href={"/"} key={index} className="text-white hover:text-gray-800">
                                    <Icon className="h-6 w-6" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-black">
                <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row items-center justify-center">
                    <p className="text-[#999999] text-sm font-poppins font-normal leading-6">
                        © Copyright Rimel 2022. All right reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}
