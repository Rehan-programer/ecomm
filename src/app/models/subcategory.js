import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
    // subItems: { type: [String], default: [] }, // ✅ Always array
  },
  { timestamps: true }
);

export default mongoose.models.Subcategory ||
  mongoose.model("Subcategory", subcategorySchema);
