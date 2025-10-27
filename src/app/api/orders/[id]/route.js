import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Orders from "../../../models/orders";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Order ID missing" }, { status: 400 });
    }

    const order = await Orders.findById(id);

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    const safeOrder = {
      id: order._id.toString(),
      userId: order.userId,
      customer: order.customer,
      phone: order.phone,
      address: order.address,
      totalAmount: order.totalAmount,
      paymentMethod: order.paymentMethod,
      status: order.status,
      placedAt: order.placedAt,
      items: order.items,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };

    return NextResponse.json(safeOrder, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching order:", error);
    return NextResponse.json(
      { message: "Server error", details: error.message },
      { status: 500 }
    );
  }
}
