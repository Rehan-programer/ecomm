import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Collection from "../../models/collection";
import Subcategory from "../../models/subcategory";
import ProductType from "../../models/productType";
import Product from "../../models/product";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const collectionName = searchParams.get("collection");
    const subcategoryName = searchParams.get("subcategory");

    // 🟢 If no collection param -> return all for header
    if (!collectionName) {
      const allSubs = await Subcategory.find({});
      return NextResponse.json({ data: allSubs }, { status: 200 });
    }
      
    // 🟢 Find the collection by name or slug
    const collection = await Collection.findOne({
      $or: [
        { name: { $regex: new RegExp(`^${collectionName}$`, "i") } },
        { slug: { $regex: new RegExp(`^${collectionName}$`, "i") } },
      ],
    });

    if (!collection)
      return NextResponse.json({ data: [], message: "Collection not found" });

    // 🟢 Prepare subcategory filter
    const filter = { categoryId: collection._id };
    if (subcategoryName) {
      filter.$or = [
        { name: { $regex: new RegExp(`^${subcategoryName}$`, "i") } },
        { slug: { $regex: new RegExp(`^${subcategoryName}$`, "i") } },
      ];
    }

    const subcategories = await Subcategory.find(filter).lean();

    // 🟢 Attach product types and product counts
    const result = await Promise.all(
      subcategories.map(async (sub) => {
        const productTypes = await ProductType.find({
          subcategoryId: sub._id,
        }).lean();

        const enrichedTypes = await Promise.all(
          productTypes.map(async (pt) => {
            const productCount = await Product.countDocuments({
              productTypeId: pt._id,
              subcategoryId: sub._id,
              categoryId: collection._id,
            });

            return { ...pt, products: Array(productCount).fill({}) };
          })
        );

        return { ...sub, productTypes: enrichedTypes };
      })
    );

    return NextResponse.json({ data: result }, { status: 200 });
  } catch (err) {
    console.error("🔥 Subcategory API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
export async function POST(req) {
  await connectDB();
  try {
    const { name, slug, description, image, categoryId } = await req.json();

    if (!name || !slug || !categoryId) {
      return NextResponse.json(
        { success: false, message: "Name, slug, categoryId required" },
        { status: 400 }
      );
    }

    const newSub = await Subcategory.create({
      name,
      slug,
      description,
      image,
      categoryId,
    });

    return NextResponse.json({ success: true, data: newSub }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
