import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import { connectDB } from "./mongodb";
import User from "@/models/User";

export async function getCurrentUser() {
  await connectDB();

  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id).select("-password");

    return JSON.parse(JSON.stringify(user));
  } catch {
    return null;
  }
}