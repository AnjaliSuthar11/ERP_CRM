import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Attendance from "@/models/Attendance";

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const body = await req.json();

    const attendance =
      await Attendance.findByIdAndUpdate(
        params.id,
        body,
        {
          new: true,
        }
      );

    return NextResponse.json({
      success: true,
      message: "Attendance Updated",
      attendance,
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

    await Attendance.findByIdAndDelete(
      params.id
    );

    return NextResponse.json({
      success: true,
      message: "Attendance Deleted",
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