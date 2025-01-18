import Image from 'next/image'
import { Truck, Headphones, ShieldCheck, Play } from 'lucide-react'
import PlayStation from "@/assets/ps5-slim-goedkope-playstation_large 1.png";
import Gucci from "@/assets/652e82cd70aa6522dd785109a455904c.png";
import Speaker from "@/assets/69-694768_amazon-echo-png-clipart-transparent-amazon-echo-png 1.png";
import WomenCollection from "@/assets/attractive-woman-wearing-hat-posing-black-background 1.png";

const services = [
  {
    icon: Truck,
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $140"
  },
  {
    icon: Headphones,
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support"
  },
  {
    icon: ShieldCheck,
    title: "MONEY BACK GUARANTEE",
    description: "We reurn money within 30 days"
  }
]

export default function NewArrival() {
  return (
    <div className="max-w-[1170px] mx-auto px-4 py-16">
      {/* Header */}
      <div className="flex flex-col mb-8">
        <div className="flex items-center gap-2">
          <div className="w-5 h-8 bg-[#DB4444]" />
          <span className="text-[#DB4444] font-medium">Featured</span>
        </div>
        <h2 className="text-3xl font-bold mt-4">New Arrival</h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-24">
        {/* PS5 Section */}
        <div className="relative aspect-[4/3] bg-black rounded-[4px] overflow-hidden w-full h-auto lg:h-[600px]">
          <Image
            src={PlayStation}
            alt="PlayStation 5"
            fill
            className="object-contain"
          />
          <div className="absolute bottom-12 left-12">
            <h3 className="text-[48px] font-semibold text-white leading-tight mb-4">PlayStation 5</h3>
            <p className="text-base text-white/80 mb-8 max-w-[300px] leading-normal">
              Black and White version of the PS5 coming out on sale.
            </p>
            <a href="#" className="text-white underline underline-offset-4 hover:text-white/90">Shop Now</a>
          </div>
        </div>

        <div className="grid grid-rows-[auto_1fr] gap-4 md:gap-8">
          {/* Women's Collections */}
          <div className="relative w-full h-[300px] bg-black rounded-[4px] overflow-hidden">
            <Image
              src={WomenCollection}
              alt="Women's Collections"
              fill
              className="object-cover object-right"
            />
            <div className="absolute bottom-8 left-8">
              <h3 className="text-[34px] font-semibold text-white leading-tight mb-4">Women's Collections</h3>
              <p className="text-base text-white/80 mb-8 max-w-[300px] leading-normal">
                Featured woman collections that give you another vibe.
              </p>
              <a href="#" className="text-white underline underline-offset-4 hover:text-white/90">Shop Now</a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
            {/* Speakers */}
            <div className="relative bg-black rounded-[4px] overflow-hidden h-[200px] md:h-[265px]">
              <Image
                src={Speaker}
                alt="Speakers"
                fill
                className="object-contain"
              />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-[24px] font-semibold text-white leading-tight mb-4">Speakers</h3>
                <p className="text-base text-white/80 mb-8">
                  Amazon wireless speakers
                </p>
                <a href="#" className="text-white underline underline-offset-4 hover:text-white/90">Shop Now</a>
              </div>
            </div>

            {/* Perfume */}
            <div className="relative bg-black rounded-[4px] overflow-hidden h-[200px] md:h-[265px]">
              <Image
                src={Gucci}
                alt="Perfume"
                fill
                className="object-contain"
              />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-[24px] font-semibold text-white leading-tight mb-4">Perfume</h3>
                <p className="text-base text-white/80 mb-8">
                  GUCCI INTENSE OUD EDP
                </p>
                <a href="#" className="text-white underline underline-offset-4 hover:text-white/90">Shop Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
        {services.map((service) => (
          <div key={service.title} className="flex flex-col items-center text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 m-[-10px] rounded-full bg-[#C1C0C1]" />
              <div className="relative w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <service.icon className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-[#000000]">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
