import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

// 🟢 PLACE ORDER
export async function POST(req) {
  try {
    const body = await req.json();
    const { Customer, Address, Phone, items } = body;

    if (!Customer || !Address || !Phone || !items?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const PlacedAt = new Date().toISOString();
    const total = items.reduce((sum, i) => sum + i.Price * i.quantity, 0);

    // Insert new order
    const [result] = await db.execute(
      `INSERT INTO orders 
        (user_id, Customer, Phone, total_amount, payment_method, address, status, created_at, \`Placed At\`)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [0, Customer, Phone, total, "COD", Address, "Pending", PlacedAt, PlacedAt]
    );

    const orderId = result.insertId;

    // Insert order items
    for (const item of items) {
      await db.execute(
        `INSERT INTO order_items 
          (order_id, product_name, price, quantity, color, size, brand)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          item.Product || item.Title,
          item.Price,
          item.quantity,
          item.selectedColor || "N/A",
          item.selectedSize || "N/A",
          item.Brand || "Unknown",
        ]
      );
    }

    return NextResponse.json({ message: "✅ Order placed", orderId, total });
  } catch (err) {
    console.error("❌ Error inserting order:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 🟡 GET ORDERS (all or filtered by status)
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get("status");

    let query = "SELECT * FROM orders ORDER BY id DESC";
    let params = [];

    if (status) {
      query = "SELECT * FROM orders WHERE status = ? ORDER BY id DESC";
      params.push(status);
    }

    const [rows] = await db.query(query, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// 🔵 UPDATE ORDER STATUS
export async function PUT(req) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "Order ID and status are required" },
        { status: 400 }
      );
    }

    await db.execute("UPDATE orders SET status = ? WHERE id = ?", [status, id]);

    // Fetch updated order to send back
    const [rows] = await db.query("SELECT * FROM orders WHERE id = ?", [id]);
    if (!rows.length) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 });
  }
}
