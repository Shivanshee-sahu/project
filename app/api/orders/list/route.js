import dbConnect from "@/config/db";
import Address from "@/models/address";
import Order from "@/models/Order";
import Product from "@/models/product";

import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    await dbConnect();
Address.length;
Product.length;
const orders = await Order.find({ userId })
  .populate('address')
  .populate('items.product');
    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
