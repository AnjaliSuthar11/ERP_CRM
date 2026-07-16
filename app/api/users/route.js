import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      users,
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

    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      department,
      designation,
      role,
    } = body;

    const exists = await User.findOne({
      email,
    });

    if (exists) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      department,
      designation,
      role,
    });

    return NextResponse.json({
      success: true,
      message: "Employee Created Successfully",
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