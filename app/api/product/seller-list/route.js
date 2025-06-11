import dbConnect from "@/config/db";
import authSeller from "@/lib/authSeller";
import Product from "@/models/product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return new Response(
        JSON.stringify({ success: false, message: "You are not authorized to view this data" }),
        { status: 403 }
      );
    }

await dbConnect();

  const products = await Product.find({});
console.log("Returning products:", products.length);  // Add this
return NextResponse.json({ success: true, products }, { status: 200 });


  } catch (error) {
    console.error("Error in seller-list route:", error); // helpful debug log
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
