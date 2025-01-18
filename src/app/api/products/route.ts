import { NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function GET() {
    try {
        return NextResponse.json(
            { 
                status: "success", 
                products: products,
                count: products.length 
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
