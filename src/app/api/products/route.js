import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Product from "../../models/product";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const category = searchParams.get("category");

    // ✅ If specific product requested by ID
    if (id) {
      const product = await Product.findById(id);
      if (!product)
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      return NextResponse.json(product, { status: 200 });
    }

    // ✅ If category-based filter
    if (category) {
      const filter = { category: { $regex: new RegExp(`^${category}$`, "i") } };
      const products = await Product.find(filter);
      return NextResponse.json(products, { status: 200 });
    }

    // ✅ Default: return all products
    const products = await Product.find();
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    await connectDB();

    const newProduct = new Product({
      ...body,
      category: body.category?.toLowerCase() || "",
      size: Array.isArray(body.size) ? body.size : [],
      color: Array.isArray(body.color) ? body.color : [],
      stock: Number(body.stock) || 0,
      createdAt: new Date(),
    });

    await newProduct.save();

    return NextResponse.json(
      { message: "Product added successfully", product: newProduct },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Error adding product:", err);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id)
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });

    await Product.findByIdAndDelete(id);
    return NextResponse.json(
      { id, message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Error deleting product:", err);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
