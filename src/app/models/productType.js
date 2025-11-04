import mongoose from "mongoose";

const producttypeSchema = new mongoose.Schema(
  {
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    description: { type: String },
    image: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// 👇 Model name consistent rakho — "Producttype" 
const Producttype =
  mongoose.models.Producttype || mongoose.model("Producttype", producttypeSchema);

export default Producttype;
