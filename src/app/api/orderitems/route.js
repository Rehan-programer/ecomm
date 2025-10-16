import { NextResponse } from "next/server";
import {db} from "../../../lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM order_items WHERE order_id = ?",
      [orderId]
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error("❌ Error fetching order items:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
