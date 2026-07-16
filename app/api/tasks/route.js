import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";

export async function GET() {
  try {
    await connectDB();

    const tasks = await Task.find()
      .populate("project", "projectName")
      .populate("assignedTo", "firstName lastName")
      .populate("assignedBy", "firstName lastName")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      tasks,
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

    const task = await Task.create(body);

    return NextResponse.json({
      success: true,
      message: "Task Created Successfully",
      task,
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