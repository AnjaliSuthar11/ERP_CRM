import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

export async function GET() {
  await connectDB();

  const projects = await Project.find()
    .populate("client", "companyName")
    .populate("manager", "firstName lastName")
    .populate("team", "firstName lastName")
    .sort({ createdAt: -1 });

  return NextResponse.json({
    success: true,
    projects,
  });
}

export async function POST(req) {
  await connectDB();

  const body = await req.json();

  const project = await Project.create(body);

  return NextResponse.json({
    success: true,
    message: "Project Created Successfully",
    project,
  });
}