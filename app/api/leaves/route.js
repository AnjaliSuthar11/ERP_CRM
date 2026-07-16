import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Leave from "@/models/Leave";

export async function GET() {
  try {
    await connectDB();

    const leaves = await Leave.find()
      .populate(
        "employee",
        "firstName lastName department"
      )
      .populate(
        "approvedBy",
        "firstName lastName"
      )
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      leaves,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const leave = await Leave.create(body);

    return NextResponse.json({
      success: true,
      message: "Leave Applied Successfully",
      leave,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      {
        status: 500,
      }
    );
  }
}