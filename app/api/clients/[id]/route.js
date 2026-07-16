import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Client from "@/models/Client";

export async function PUT(req,{params}){

    await connectDB();

    const body=await req.json();

    const client=await Client.findByIdAndUpdate(
        params.id,
        body,
        {
            new:true,
        }
    );

    return NextResponse.json({
        success:true,
        message:"Client Updated",
        client,
    });

}

export async function DELETE(req,{params}){

    await connectDB();

    await Client.findByIdAndDelete(params.id);

    return NextResponse.json({
        success:true,
        message:"Client Deleted",
    });

}