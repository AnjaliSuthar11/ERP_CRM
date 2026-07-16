import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function GET() {

  await connectDB();

  const leads = await Lead.find()
    .populate(
      "assignedTo",
      "firstName lastName"
    )
    .sort({
      createdAt: -1,
    });

  return NextResponse.json({
    success: true,
    leads,
  });

}

export async function POST(req) {

  await connectDB();

  const body = await req.json();

  const lead = await Lead.create(body);

  return NextResponse.json({
    success: true,
    message: "Lead Added Successfully",
    lead,
  });

}