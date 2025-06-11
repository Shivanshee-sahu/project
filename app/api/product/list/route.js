import dbConnect from "@/config/db";
import Product from "@/models/product";

import { NextResponse } from "next/server";

export async function GET(request) {
  try {
   
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
