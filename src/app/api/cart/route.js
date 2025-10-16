import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

// GET cart items
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId") || "guest";

    const [rows] = await db.query("SELECT * FROM carts WHERE userId = ?", [
      userId,
    ]);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    return NextResponse.json(
      { message: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

// POST add/update cart item
export async function POST(req) {
  try {
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
    console.log("values====>", body);

    const [existingRows] = await db.query(
      "SELECT * FROM `carts` WHERE userId = ? AND productId = ? AND color = ? AND size = ?",
      [userId, productId, color, size]
    );

    let addedItem;

    if (existingRows.length > 0) {
      const newQuantity = existingRows[0].quantity + quantity;
      await db.query("UPDATE carts SET quantity = ? WHERE id = ?", [
        newQuantity,
        existingRows[0].id,
      ]);
      addedItem = { ...existingRows[0], quantity: newQuantity };
    } else {
      const [result] = await db.query(
        "INSERT INTO carts (userId, productId, name, color, size, price, quantity, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [userId, productId, name, color, size, price, quantity, image]
      );
      addedItem = {
        id: result.insertId,
        userId,
        productId,
        name,
        color,
        size,
        price,
        quantity,
        image,
      };
    }

    return NextResponse.json(addedItem);
  } catch (error) {
    console.error("Failed to add item to cart:", error);
    return NextResponse.json(
      { message: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}

// DELETE cart item
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const cartId = url.searchParams.get("id");

    if (!cartId)
      return NextResponse.json(
        { message: "Cart ID required" },
        { status: 400 }
      );

    await db.query("DELETE FROM carts WHERE id = ?", [cartId]);
    return NextResponse.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Failed to delete cart item:", error);
    return NextResponse.json(
      { message: "Failed to delete cart item" },
      { status: 500 }
    );
  }
}
