import { NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function GET(
    request: Request,
    { params }: { params: { category: string } }
) {
    try {
        const categoryProducts = products.filter(
            p => p.category.toLowerCase() === params.category.toLowerCase()
        );
        
        if (categoryProducts.length === 0) {
            return NextResponse.json(
                { 
                    status: "error", 
                    message: "No products found in this category" 
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { 
                status: "success", 
                products: categoryProducts,
                count: categoryProducts.length 
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
