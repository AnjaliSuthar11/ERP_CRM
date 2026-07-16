import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const user = await User.findById(params.id).select("-password");

    return NextResponse.json({
      success: true,
      user,
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

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const body = await req.json();

    const user = await User.findByIdAndUpdate(
      params.id,
      body,
      {
        new: true,
      }
    ).select("-password");

    return NextResponse.json({
      success: true,
      message: "Employee Updated",
      user,
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

    await User.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      message: "Employee Deleted",
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