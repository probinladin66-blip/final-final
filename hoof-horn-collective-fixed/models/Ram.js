import mongoose from "mongoose";

const RamSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  description: String
});

export default mongoose.models.Ram || mongoose.model("Ram", RamSchema);