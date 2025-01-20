import { client } from '@/sanity/lib/client';
import { getProductDetailsByIdQuery } from '@/sanity/lib/queries';
import ProductPage from "@/components/Dynamic-Page";
import RelatedItems from "@/components/Related-Item";

export default async function ProductPageDynamic({ params }: { params: { id: string } }) {
    const product = await client.fetch(getProductDetailsByIdQuery, { id: params.id });

    if (!product) {
        return <div>Product not found</div>;    
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <ProductPage product={product} />
            <RelatedItems category={product.category} />
        </main>
    );
}