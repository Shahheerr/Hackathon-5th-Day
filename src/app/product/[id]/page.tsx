import ProductPage from "@/components/Dynamic-Page";
import RelatedItems from "@/components/Related-Item";

export default function Product() {
    return (
        <>
            <main className="container mx-auto">
                <ProductPage />
                <RelatedItems />
            </main>
        </>
    )
}