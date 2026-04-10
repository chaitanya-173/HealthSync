import mongoose from "mongoose";

const savedEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String, // e.g. "Morning Milk"
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    result: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SavedEntry", savedEntrySchema);