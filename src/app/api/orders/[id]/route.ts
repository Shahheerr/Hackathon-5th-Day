import { NextResponse } from "next/server";
import { client as sanityClient } from "@/sanity/lib/client";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const order = await sanityClient.fetch(`
      *[_type == "order" && _id == $id][0]
    `, { id });

        if (!order) {
            return NextResponse.json({ success: false, message: "Order not found." });
        }

        return NextResponse.json({ success: true, data: order });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        await sanityClient.delete(id);

        return NextResponse.json({ success: true, message: "Order deleted successfully." });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}