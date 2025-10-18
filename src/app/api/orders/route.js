import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Orders from "../../models/orders";

// ✅ CREATE ORDER (POST)
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { customer, address, phone, items, userId = "guest" } = body;

    if (!customer || !address || !phone || !items?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    } 

    // Calculate total
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Create new order
    const newOrder = await Orders.create({
      userId,
      customer,
      phone,
      address,
      totalAmount,
      items,
      paymentMethod: "COD",
      status: "Pending",
    });

    return NextResponse.json(
      {
        message: "✅ Order placed successfully",
        order: newOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error placing order:", error);
    return NextResponse.json(
      { error: "Failed to place order", details: error.message },
      { status: 500 }
    );
  }
}

// ✅ GET ORDERS (All or Filtered by Status)
export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const status = url.searchParams.get("status");

    const filter = status ? { status } : {};
    const orders = await Orders.find(filter).sort({ createdAt: -1 });

    // Convert Mongo objects safely for frontend
    const safeOrders = orders.map((order) => ({
      id: order._id.toString(),
      customer: order.customer,
      phone: order.phone,
      address: order.address,
      totalAmount: order.totalAmount,
      paymentMethod: order.paymentMethod,
      status: order.status,
      placedAt: order.placedAt?.toISOString?.() || null,
      items: order.items,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));

    return NextResponse.json(safeOrders, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders", details: error.message },
      { status: 500 }
    );
  }
}

// ✅ UPDATE ORDER STATUS (PUT)
export async function PUT(req) {
  try {
    await connectDB();
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "Order ID and status are required" },
        { status: 400 }
      );
    }

    const updatedOrder = await Orders.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "✅ Order status updated successfully",
        order: {
          id: updatedOrder._id.toString(),
          status: updatedOrder.status,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order", details: error.message },
      { status: 500 }
    );
  }
}
