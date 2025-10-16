import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// GET products
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("Category") || searchParams.get("category");

    let sql = "SELECT * FROM products";
    const values = [];

    if (category) {
      sql += " WHERE LOWER(Category) = LOWER(?)";
      values.push(category);
    }

    const [rows] = await db.query(sql, values);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Error fetching products" }, { status: 500 });
  }
}

// POST add product
export async function POST(req) {
  try {
    const body = await req.json();
    const { image, title, category, price, size, color, brand, stock, active } = body;

    const sql = `
      INSERT INTO products 
      (Image, Product, Category, Price, Size, Color, Brand, Quantity, Stock, Active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      image || "",
      title || "",
      category || "",
      price || 0,
      Array.isArray(size) ? size.join(",") : size || "",
      Array.isArray(color) ? color.join(",") : color || "",
      brand || "",
      stock || 0,
      stock > 0 ? "In Stock" : "Out of Stock",
      active ? 1 : 0,
    ];

    const [result] = await db.query(sql, values);

    return NextResponse.json({
      message: "Product added successfully!",
      product: { id: result.insertId, image, title, category, price, size, color, brand, stock, active }
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ message: "Error adding product", error: error.message }, { status: 500 });
  }
}

// DELETE product
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ message: "Missing product ID" }, { status: 400 });

    await db.query("DELETE FROM products WHERE id = ?", [id]);
    return NextResponse.json({ message: "Product deleted successfully!" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ message: "Error deleting product" }, { status: 500 });
  }
}
