import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

export async function GET(req, { params }) {
  await connectDB();

  const project = await Project.findById(params.id)
    .populate("client")
    .populate("manager")
    .populate("team");

  return NextResponse.json({
    success: true,
    project,
  });
}

export async function PUT(req, { params }) {
  await connectDB();

  const body = await req.json();

  const project = await Project.findByIdAndUpdate(
    params.id,
    body,
    {
      new: true,
    }
  );

  return NextResponse.json({
    success: true,
    message: "Project Updated",
    project,
  });
}

export async function DELETE(req, { params }) {
  await connectDB();

  await Project.findByIdAndDelete(params.id);

  return NextResponse.json({
    success: true,
    message: "Project Deleted",
  });
}