import BestSelling from "@/components/BestSelling";
import BrowseCategories from "@/components/Category";
import ExploreProducts from "@/components/ExploreProduct";
import FlashSales from "@/components/FlashSaleSection";
import HeroSection from "@/components/HeroSection";
import MusicHero from "@/components/MusicHero";
import NewArrival from "@/components/NewArrival";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-16">
      <HeroSection />
      <FlashSales />
      <BrowseCategories />
      <BestSelling />
      <MusicHero />
      <ExploreProducts />
      <NewArrival />
    </div>
  )
}

