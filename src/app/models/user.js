import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    // 👇 New combined name field
    name: { type: String },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // 👇 Optional contact info (for checkout autofill)
    phone: { type: String, default: "" },
    address: { type: String, default: "" },

    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
