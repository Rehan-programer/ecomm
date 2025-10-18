import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import orders from "../../models/orders";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    // MongoDB me find order by _id and return items array
    const order = await orders.findById(orderId).select("items");

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order.items);
  } catch (err) {
    console.error("❌ Error fetching order items:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { orderId, productId, productName, price, quantity, color, size, brand } = body;

    if (!orderId || !productId || !productName || !price || !quantity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const order = await orders.findById(orderId);
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    const newItem = {
      productId,
      productName,
      price,
      quantity,
      color,
      size,
      brand,
    };

    order.items.push(newItem);
    await order.save();

    return NextResponse.json({ message: "✅ Item added successfully", item: newItem });
  } catch (err) {
    console.error("❌ Error adding order item:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { orderId, itemId, quantity, price, color, size } = body;

    if (!orderId || !itemId) {
      return NextResponse.json({ error: "orderId and itemId required" }, { status: 400 });
    }

    const order = await orders.findById(orderId);
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    const item = order.items.id(itemId);
    if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });

    if (quantity !== undefined) item.quantity = quantity;
    if (price !== undefined) item.price = price;
    if (color !== undefined) item.color = color;
    if (size !== undefined) item.size = size;

    await order.save();
    return NextResponse.json({ message: "✅ Item updated successfully", item });
  } catch (err) {
    console.error("❌ Error updating order item:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");
    const itemId = searchParams.get("itemId");

    if (!orderId || !itemId) {
      return NextResponse.json({ error: "orderId and itemId required" }, { status: 400 });
    }

    const order = await orders.findById(orderId);
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    const item = order.items.id(itemId);
    if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });

    item.remove();
    await order.save();

    return NextResponse.json({ message: "✅ Item deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting order item:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
