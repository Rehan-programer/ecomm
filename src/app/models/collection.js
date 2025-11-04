import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
});

// ⚠️ Capital 'C' in Collection is important
export default mongoose.models.Collection || mongoose.model("Collection", collectionSchema, "collection");
