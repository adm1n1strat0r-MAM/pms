import mongoose from "mongoose";

const { Schema } = mongoose;

const rollSchema = new Schema(
  {
    carrugationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Carrugation",
      required: true,
      unique: true,
    },
    rollType: {
      type: String,
      required: true,
      unique: true,
    },
    rollQty: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Roll = mongoose.model("Roll", rollSchema);

export default Roll;
