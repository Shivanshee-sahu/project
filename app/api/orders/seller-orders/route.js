import authSeller from "@/lib/authSeller";
import Address from "@/models/address";
import Order from "@/models/Order";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const {userId}= getAuth(request);
        const isSeller = await authSeller(userId)
        if(!isSeller) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        Address.length;
        const orders=await Order.find({}).populate('address').populate('items.product')
        return NextResponse.json({ success: true, orders }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to fetch orders" }, { status: 500 });
    }
}