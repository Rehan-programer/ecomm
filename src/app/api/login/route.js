import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import User from "../../models/user";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    const { password: _, ...safeUser } = user.toObject();

    return NextResponse.json({ message: "Login successful!", user: safeUser }, { status: 200 });
  } catch (error) {
    console.error("❌ Login Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
