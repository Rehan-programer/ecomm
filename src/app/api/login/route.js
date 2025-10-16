import bcrypt from "bcryptjs";
import { db } from "../../../lib/db";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const [rows] = await db.query("SELECT * FROM signup WHERE `email` = ?", [email]);
    if (rows.length === 0) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user["password"]);

    if (!isMatch) {
      return Response.json({ message: "Invalid password" }, { status: 401 });
    }

    const { password: _, ...safeUser } = user;

    return Response.json({
      message: "Login successful!",
      user: safeUser,
    }, { status: 200 });

  } catch (error) {
    console.error("❌ Login Error:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
  