import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Collection from '../../models/collection'
import Subcategory from '../../models/subcategory'
import ProductType from "../../models/productType";
import Product from "../../models/product";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const collectionName = searchParams.get("collection");
    const subcategoryName = searchParams.get("subcategory");
    const slug = searchParams.get("slug");

    if (!collectionName && !subcategoryName) {
         // Return all subcategories (for header dropdown)
         const product = await ProductType.find({});
         return NextResponse.json({ data: product }, { status: 200 });
       }
       

    // 🟢 Find collection
    const collection = await Collection.findOne({
      $or: [
        { name: { $regex: new RegExp(`^${collectionName}$`, "i") } },
        { slug: { $regex: new RegExp(`^${collectionName}$`, "i") } },
      ],
    });

    if (!collection)
      return NextResponse.json({ data: [], message: "Collection not found" });

    // 🟢 Find subcategory
    const subcategory = await Subcategory.findOne({
      categoryId: collection._id,
      $or: [
        { name: { $regex: new RegExp(`^${subcategoryName}$`, "i") } },
        { slug: { $regex: new RegExp(`^${subcategoryName}$`, "i") } },
      ],
    });

    if (!subcategory)
      return NextResponse.json({ data: [], message: "Subcategory not found" });

    // 🟢 Find product type by slug/name
    const productType = await ProductType.findOne({
      subcategoryId: subcategory._id,
      $or: [
        { name: { $regex: new RegExp(`^${slug}$`, "i") } },
        { slug: { $regex: new RegExp(`^${slug}$`, "i") } },
      ],
    });

    if (!productType)
      return NextResponse.json({ data: [], message: "ProductType not found" });

    // 🟢 Find all products for this productType
    const products = await Product.find({
      productTypeId: productType._id,
      subcategoryId: subcategory._id,
      categoryId: collection._id,
    }).lean();

    const result = {
      ...productType.toObject(),
      products: products || [],
    };

    return NextResponse.json({ data: [result] }, { status: 200 });
  } catch (err) {
    console.error("🔥 ProductType API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  try {
    const { name, slug, description, image, subcategoryId, isActive } =
      await req.json();

    if (!name || !slug || !subcategoryId) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, slug, and subcategoryId are required",
        },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await ProductType.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Slug already exists, choose a different one",
        },
        { status: 400 }
      );
    }

    const newType = await ProductType.create({
      name,
      slug,
      description,
      image,
      subcategoryId,
      isActive,
    });
    return NextResponse.json({ success: true, data: newType }, { status: 201 });
  } catch (err) {
    console.error("POST /productType error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
