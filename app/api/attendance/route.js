import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Attendance from "@/models/Attendance";

export async function GET() {
  try {
    await connectDB();

    const attendance = await Attendance.find()
      .populate(
        "employee",
        "firstName lastName department"
      )
      .sort({ date: -1 });

    return NextResponse.json({
      success: true,
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

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const attendance = await Attendance.create(body);

    return NextResponse.json({
      success: true,
      message: "Attendance Added",
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