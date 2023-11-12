import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["Manager", "User", "Admin"],
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    resetToken: {
      type: String,
      default: "",
    },
    profilePicture: String, // Store URL or file path for profile picture
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
