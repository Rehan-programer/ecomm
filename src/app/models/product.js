import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    productTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producttype",
      required: true,
    },

    // 🧩 Product fields
    image: { type: String, default: "" },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: [String], default: [] },
    color: { type: [String], default: [] },
    brand: { type: String, default: "" },
    stock: { type: Number, default: 0 },
    status: { type: String, default: "In Stock" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
