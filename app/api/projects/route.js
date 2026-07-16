import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find()
      .populate("manager", "firstName lastName")
      .populate("team", "firstName lastName")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      projects,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const project = await Project.create(body);

    return NextResponse.json({
      success: true,
      message: "Project Created Successfully",
      project,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 }
    );
  }
}