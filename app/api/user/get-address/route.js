import dbConnect from "@/config/db";
import Address from "@/models/address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    await dbConnect();

    const addresses = await Address.find({ userId });

    if (addresses.length === 0) {
      return NextResponse.json(
        { success: false, message: "No address found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, addresses }, { status: 200 });

  } catch (error) {
    console.error("Error in get address route:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

