import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: false,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Log", logSchema);