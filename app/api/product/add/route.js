import authSeller from "@/lib/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import Product from "@/models/product";   // Ensure your model is correctly defined
import dbConnect from "@/config/db";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    const isSeller = await authSeller(userId);

    if (!isSeller) {
      return new Response(
        JSON.stringify({ success: false, message: "You are not authorized to add products" }),
        { status: 403 }
      );
    }

    const formData = await req.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const price = formData.get("price");
    const offerPrice = formData.get("offerPrice");
    const files = formData.getAll("images");

    if (!files || files.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Please upload at least one image" }),
        { status: 400 }
      );
    }

    const uploadPromises = files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        });

        stream.end(buffer);
      });
    });

    const imageUrls = await Promise.all(uploadPromises);

    await dbConnect();

    const product = await Product.create({
      userId,
      name,
      description,
      category,
      price: parseFloat(price),
      offerPrice: parseFloat(offerPrice),
      images: imageUrls,
      date: Date.now(),
    });

    return NextResponse.json({ success: true, message: "Product added successfully", product });

  } catch (error) {
    console.error("Product upload error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server Error" }),
      { status: 500 }
    );
  }
}
