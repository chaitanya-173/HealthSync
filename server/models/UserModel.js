import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    nutritionGoals: {
      calories: {
        type: Number,
        default: 2500,
      },

      protein: {
        type: Number,
        default: 150,
      },

      carbs: {
        type: Number,
        default: 250,
      },

      fat: {
        type: Number,
        default: 70,
      },

      waterCups: {
        type: Number,
        default: 10,
      },
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;