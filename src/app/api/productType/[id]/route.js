import { NextResponse } from "next/server";
import Producttype from "../../../models/productType";
import { connectDB } from "../../../../lib/db";

export async function PUT(req, { params }) {
  await connectDB();
  try {
    const { id } = params;
    const { name, slug, description, image, subcategoryId, isActive } = await req.json();

    const updated = await Producttype.findByIdAndUpdate(
      id,
      { name, slug, description, image, subcategoryId, isActive },
      { new: true }
    );

    if (!updated) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  try {
    const { id } = params;
    const deleted = await Producttype.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 });
  }
}
