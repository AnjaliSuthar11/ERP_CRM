import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function PUT(req,{params}){

    await connectDB();

    const body=await req.json();

    const lead=await Lead.findByIdAndUpdate(
        params.id,
        body,
        {
            new:true,
        }
    );

    return NextResponse.json({
        success:true,
        message:"Lead Updated",
        lead,
    });

}

export async function DELETE(req,{params}){

    await connectDB();

    await Lead.findByIdAndDelete(params.id);

    return NextResponse.json({
        success:true,
        message:"Lead Deleted",
    });

}