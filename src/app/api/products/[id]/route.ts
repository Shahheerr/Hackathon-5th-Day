import { NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const product = products.find(p => p.id === params.id);
        
        if (!product) {
            return NextResponse.json(
                { 
                    status: "error", 
                    message: "Product not found" 
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { 
                status: "success", 
                product 
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { 
                status: "error", 
                message: "Failed to fetch product" 
            },
            { status: 500 }
        );
    }
}
