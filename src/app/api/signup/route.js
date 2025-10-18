import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import User from "../../models/user";

export async function POST(req) {
  try {
    await connectDB();

    const { firstName, lastName, email, password, confirmPassword } = await req.json();

    if (password !== confirmPassword) {
      return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "Signup successful!", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
