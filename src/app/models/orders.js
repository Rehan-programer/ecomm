import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    customer: String,
    phone: String,
    address: String,
    totalAmount: Number,
    paymentMethod: String,
    status: String,
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        productName: String,
        price: Number,
        quantity: Number,
        color: String,
        size: String,
      },
    ],
    placedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
