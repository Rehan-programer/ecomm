import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import Collection from "../../models/collection";
import Subcategory from "../../models/subcategory";
import ProductType from "../../models/productType";
import Product from "../../models/product";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const collectionName = searchParams.get("categoryId");
    const subcategoryName = searchParams.get("subcategory");
    const producttypeName = searchParams.get("producttype");
    const productTitle = searchParams.get("productTitle"); // the specific product name

    let filter = {};

    // 1️⃣ Find collection
    if (collectionName) {
      const collection = await Collection.findOne({
        $or: [
          { name: { $regex: new RegExp(`^${collectionName}$`, "i") } },
          { slug: { $regex: new RegExp(`^${collectionName}$`, "i") } },
        ],
      });
      if (!collection)
        return NextResponse.json({ data: null, message: "Collection not found" });
      filter.categoryId = collection._id;
    }

    // 2️⃣ Find subcategory
    if (subcategoryName) {
      const subcategory = await Subcategory.findOne({
        $or: [
          { name: { $regex: new RegExp(`^${subcategoryName}$`, "i") } },
          { slug: { $regex: new RegExp(`^${subcategoryName}$`, "i") } },
        ],
        categoryId: filter.categoryId,
      });
      if (!subcategory)
        return NextResponse.json({ data: null, message: "Subcategory not found" });
      filter.subcategoryId = subcategory._id;
    }

    // 3️⃣ Find product type
    if (producttypeName) {
      const productType = await ProductType.findOne({
        $or: [
          { name: { $regex: new RegExp(`^${producttypeName}$`, "i") } },
          { slug: { $regex: new RegExp(`^${producttypeName}$`, "i") } },
        ],
        subcategoryId: filter.subcategoryId,
      });
      if (!productType)
        return NextResponse.json({ data: null, message: "Product type not found" });
      filter.productTypeId = productType._id;
    }

    // 4️⃣ Find the specific product by title
    if (productTitle) {
      filter.title = { $regex: new RegExp(`^${productTitle}$`, "i") };
    }

    const product = await Product.find(filter);

    if (!product)
      return NextResponse.json({ data: null, message: "Product not found" });

    return NextResponse.json({ data: product }, { status: 200 });
  } catch (err) {
    console.error("❌ Error in GET /api/products:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// --------------------- POST New Product ---------------------
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    if (
      !body.title ||
      !body.categoryId ||
      !body.subcategoryId ||
      !body.productTypeId
    ) {
      return NextResponse.json(
        {
          error:
            "All related IDs (categoryId, subcategoryId, productTypeId) and title are required",
        },
        { status: 400 }
      );
    }

    const newProduct = new Product({
      ...body,
      size: Array.isArray(body.size) ? body.size : [],
      color: Array.isArray(body.color) ? body.color : [],
      stock: Number(body.stock) || 0,
    });

    await newProduct.save();

    return NextResponse.json(
      { message: "Product added successfully", product: newProduct },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Error adding product:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// --------------------- PUT Update Product ---------------------
export async function PUT(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id || !mongoose.Types.ObjectId.isValid(id))
      return NextResponse.json(
        { error: "Valid Product ID required" },
        { status: 400 }
      );

    const body = await req.json();
    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedProduct)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json(
      { message: "Product updated", product: updatedProduct },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Error updating product:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// --------------------- DELETE Product ---------------------
export async function DELETE(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id || !mongoose.Types.ObjectId.isValid(id))
      return NextResponse.json(
        { error: "Valid Product ID required" },
        { status: 400 }
      );

    await Product.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Deleted successfully", id },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Error deleting product:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
