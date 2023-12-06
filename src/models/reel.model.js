import mongoose from "mongoose";

const { Schema } = mongoose;

const reelSchema = new Schema(
  {
    size: {
      type: Number,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    weight: {
      type: Number,
      require: true,
    },
    status: {
      type: String,
      enum: ["Corrugation", "Stock", "Finished"],
      default: "Stock",
    },
    GSM: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Reel = mongoose.model("Reel", reelSchema);

export default Reel;
