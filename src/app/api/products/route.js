import { connectDB } from "../../../lib/db";
import Product from "../../models/product";

export async function POST(req) {
  try {
    const body = await req.json();
    await connectDB();

    const newProduct = new Product({
      ...body,
      size: Array.isArray(body.size) ? body.size : [],
      color: Array.isArray(body.color) ? body.color : [],
      stock: Number(body.stock) || 0,
      createdAt: new Date(),
    });

    await newProduct.save();

    return new Response(JSON.stringify({ message: "Product added successfully", product: newProduct }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to add product" }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return new Response(JSON.stringify({ error: "Product ID required" }), { status: 400 });

    await Product.findByIdAndDelete(id);
    return new Response(JSON.stringify({ id, message: "Product deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to delete product" }), { status: 500 });
  }
}
