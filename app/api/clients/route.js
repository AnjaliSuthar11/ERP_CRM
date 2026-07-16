import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Client from "@/models/Client";

export async function GET() {

  await connectDB();

  const clients = await Client.find().sort({
    createdAt: -1,
  });

  return NextResponse.json({
    success: true,
    clients,
  });

}

export async function POST(req) {

  await connectDB();

  const body = await req.json();

  const client = await Client.create(body);

  return NextResponse.json({
    success: true,
    message: "Client Created Successfully",
    client,
  });

}