import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

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
    } = body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const exists = await User.findOne({
      email,
    });

    if (exists) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
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
      phone,
      password: hashedPassword,
    });

    return NextResponse.json({
      success: true,
      message: "Registration Successful",
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