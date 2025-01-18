import { NextResponse } from 'next/server';
import { products } from '@/data/products';
import type { ProductTag } from '@/data/products';

export async function GET(
    request: Request,
    { params }: { params: { tag: ProductTag } }
) {
    try {
        const tagProducts = products.filter(p => p.tags.includes(params.tag));
        
        if (tagProducts.length === 0) {
            return NextResponse.json(
                { 
                    status: "error", 
                    message: "No products found with this tag" 
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { 
                status: "success", 
                products: tagProducts,
                count: tagProducts.length 
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { 
                status: "error", 
                message: "Failed to fetch products" 
            },
            { status: 500 }
        );
    }
}
