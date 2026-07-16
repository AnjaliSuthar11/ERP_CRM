import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";

export async function GET(req, { params }) {
  await connectDB();

  const task = await Task.findById(params.id)
    .populate("project")
    .populate("assignedTo")
    .populate("assignedBy");

  return NextResponse.json({
    success: true,
    task,
  });
}

export async function PUT(req, { params }) {
  await connectDB();

  const body = await req.json();

  const task = await Task.findByIdAndUpdate(
    params.id,
    body,
    {
      new: true,
    }
  );

  return NextResponse.json({
    success: true,
    message: "Task Updated",
    task,
  });
}

export async function DELETE(req, { params }) {
  await connectDB();

  await Task.findByIdAndDelete(params.id);

  return NextResponse.json({
    success: true,
    message: "Task Deleted",
  });
}