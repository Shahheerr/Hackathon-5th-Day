import { NextResponse } from "next/server";
import {client as sanityClient} from "@/sanity/lib/client";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validation
        if (!body.userId || !body.orderItems || !body.totalAmount || !body.shippingAddress) {
            return NextResponse.json({ success: false, message: "Missing required fields." });
        }

        // New Order Object
        const newOrder = {
            _type: "order",
            userId: body.userId,
            orderItems: body.orderItems,
            totalAmount: body.totalAmount,
            status: "pending", // Default status
            shippingAddress: body.shippingAddress,
            createdAt: new Date().toISOString(),
        };

        // Save Order in Sanity
        const createdOrder = await sanityClient.create(newOrder);

        return NextResponse.json({ success: true, data: createdOrder });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

export async function GET() {
  try {
    const orders = await sanityClient.fetch(`
      *[_type == "order"] | order(createdAt desc)
    `);

    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
