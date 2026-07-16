import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Department from "@/models/Department";

export async function GET() {
  try {
    await connectDB();

    const departments = await Department.find()
      .populate("manager", "firstName lastName email")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      departments,
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

    const department = await Department.create(body);

    return NextResponse.json({
      success: true,
      message: "Department Created",
      department,
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