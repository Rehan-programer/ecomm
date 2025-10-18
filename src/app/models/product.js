import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    image: { type: String, default: "" },
    title: { type: String, required: true },
    category: { type: String, default: "" },
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

export default mongoose.models.Product || mongoose.model("Product", productSchema);
