import mongoose from "mongoose";

const FavouriteSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  },
  { timestamps: true }
);

// Explicit collection name "favourite"
export default mongoose.models.Favourite || mongoose.model("Favourite", FavouriteSchema, "favourite");
