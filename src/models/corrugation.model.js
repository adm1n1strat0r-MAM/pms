import mongoose from "mongoose";

const { Schema } = mongoose;

const carrugationSchema = new Schema(
  {
    paper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reel",
      required: true,
    },
    medium: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reel",
      required: true,
    },
    size: {
      type: Number,
    },
    type: {
      type: String,
    },
    roll: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Processing", "Completed"],
      default: "Processing",
    },
  },
  {
    timestamps: true,
  }
);

const Corrugation = mongoose.model("Corrugation", carrugationSchema);

export default Corrugation;
