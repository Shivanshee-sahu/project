import dbConnect from "@/config/db";
import Address from "@/models/address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request){
    try{
const {userId}=getAuth(request);
const {address}=await request.json();

        await dbConnect();
        const newAddress=await Address.create({...address, userId});
        return NextResponse.json({ success: true, message: "Address updated successfully" ,newAddress}, { status: 200 });

    }
    catch(error){
return NextResponse.json(
            { success: false, message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}