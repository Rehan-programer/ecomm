import { NextResponse } from "next/server";
import Cart from "@/models/Cart";
import { connectDB } from "../../../lib/db";

// ✅ GET: Fetch user's cart
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || "guest";

    const cart = await Cart.find({ userId }).populate("productId");
    return NextResponse.json(cart);
  } catch (error) {
    console.error("❌ Failed to fetch cart:", error);
    return NextResponse.json(
      { message: "Failed to fetch cart", error: error.message },
      { status: 500 }
    );
  }
}

// ✅ POST: Add or Update Cart Item
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      userId = "guest",
      productId,
      name,
      color,
      size,
      price,
      quantity,
      image,
    } = body;

    // Find existing item
    const existingItem = await Cart.findOne({ userId, productId, color, size });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return NextResponse.json({
        message: "Cart updated",
        item: existingItem,
      });
    }

    const newItem = await Cart.create({
      userId,
      productId,
      name,
      color,
      size,
      price,
      quantity,
      image,
    });

    return NextResponse.json({
      message: "Item added to cart",
      item: newItem,
    });
  } catch (error) {
    console.error("❌ Failed to add to cart:", error);
    return NextResponse.json(
      { message: "Failed to add to cart", error: error.message },
      { status: 500 }
    );
  }
}

// ✅ DELETE: Remove item from cart
export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const cartId = searchParams.get("id");

    if (!cartId)
      return NextResponse.json(
        { message: "Cart ID required" },
        { status: 400 }
      );

    await Cart.findByIdAndDelete(cartId);
    return NextResponse.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("❌ Failed to delete item:", error);
    return NextResponse.json(
      { message: "Failed to delete item", error: error.message },
      { status: 500 }
    );
  }
}
