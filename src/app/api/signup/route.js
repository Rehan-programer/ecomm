import bcrypt from "bcryptjs";
import { db } from "../../../lib/db";

export async function POST(req) {
  try {
    const { firstName, lastName, email, password, confirmPassword } =
      await req.json();

    if (password !== confirmPassword) {
      return Response.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    const [existing] = await db.query(
      "SELECT * FROM signup WHERE `email` = ?",
      [email]
    );
    if (existing.length > 0) {
      return Response.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirm = await bcrypt.hash(confirmPassword, 10);

    await db.query(
      "INSERT INTO signup (`first-name`, `last-name`, `email`, `password`, `confirm-password`) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName, email, hashedPassword, hashedConfirm]
    );

    return Response.json({ message: "Signup successful!" }, { status: 201 });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
