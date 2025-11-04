

import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Collection from "../../models/collection";
import Product from "../../models/product";
import Producttype from "../../models/productType";
import subcategory from "../../models/subcategory";


export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    let collections;
    if (id) {
      collections = await Collection.find({ _id: id }).lean();
    } else {
      collections = await Collection.find({}).lean();
    }

    const collectionsWithProducts = await Promise.all(
      collections.map(async (collection) => {
        // Get subcategories under this collection
        const subcategories = await subcategory.find({ categoryId: collection._id }).lean();

        // For each subcategory, get product types and their products
        const subcategoriesWithProducts = await Promise.all(
          subcategories.map(async (sub) => {
            const productTypes = await Producttype.find({ subcategoryId: sub._id }).lean();

            const productTypesWithProducts = await Promise.all(
              productTypes.map(async (pt) => {
                const products = await Product.find({ productTypeId: pt._id })
                  .populate("categoryId", "name")
                  .populate("subcategoryId", "name slug")
                  .populate("productTypeId", "name slug")
                  .lean();
                return { ...pt, products };
              })
            );

            return { ...sub, productTypes: productTypesWithProducts };
          })
        );

        return { ...collection, subcategories: subcategoriesWithProducts };
      })
    );

    return NextResponse.json({ data: collectionsWithProducts }, { status: 200 });
  } catch (err) {
    console.error("GET /collections error:", err);
    return NextResponse.json({ error: "Failed to fetch collections with products" }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    if (!data.name) return NextResponse.json({ error: "Name required" }, { status: 400 });

    const newCollection = await Collection.create(data);
    console.log("New Collection inserted:", newCollection);
    return NextResponse.json({ data: newCollection }, { status: 201 });
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json({ error: "Failed to add collection" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });

    await Collection.findByIdAndDelete(id);

    return new Response(JSON.stringify({ message: "Collection deleted successfully" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to delete collection" }), { status: 500 });
  }
}
