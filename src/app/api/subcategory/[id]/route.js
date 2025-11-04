import { NextResponse } from "next/server";
import Subcategory from "../../../models/subcategory";
import { connectDB } from "../../../../lib/db";

export async function PUT(req, { params }) {
  await connectDB();
  try {
    const { id } = params;
    const body = await req.json();

    // Ensure subItems always array
    if (body.subItems) {
      body.subItems = Array.isArray(body.subItems)
        ? body.subItems
        : typeof body.subItems === "string"
        ? body.subItems.split(",").map(s => s.trim())
        : [];
    } else {
      body.subItems = [];
    }

    const updated = await Subcategory.findByIdAndUpdate(id, body, { new: true });

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
    const deleted = await Subcategory.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 });
  }
}
