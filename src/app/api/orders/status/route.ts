import { NextResponse } from "next/server";
import { client as sanityClient } from "@/sanity/lib/client";

export async function PUT(request: Request) {
    try {
        const body = await request.json();

        if (!body.id || !body.status) {
            return NextResponse.json({ success: false, message: "Missing required fields." });
        }

        const updatedOrder = await sanityClient.patch(body.id).set({ status: body.status }).commit();

        return NextResponse.json({ success: true, data: updatedOrder });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

