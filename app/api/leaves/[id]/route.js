import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Leave from "@/models/Leave";

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const body = await req.json();

    const leave =
      await Leave.findByIdAndUpdate(
        params.id,
        body,
        {
          new: true,
        }
      );

    return NextResponse.json({
      success: true,
      message: "Leave Updated",
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

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    await Leave.findByIdAndDelete(
      params.id
    );

    return NextResponse.json({
      success: true,
      message: "Leave Deleted",
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