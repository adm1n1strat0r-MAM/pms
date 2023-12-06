import mongoose from "mongoose";

const { Schema } = mongoose;

const pastingSchema = new Schema(
  {
    ItemName: {
      type: String,
      required: true,
    },
    sheetQty: {
      type: Number,
    },
    isFold: {
      type: Boolean,
      default: false,
    },
    bottomCS: {
      type: Number,
      required: true,
    },
    bottomRS: {
      type: Number,
      required: true,
    },
    topCS: {
      type: Number,
    },
    topRS: {
      type: Number,
    },
    rollReqForBottom: {
      type: Number,
    },
    rollReqForTop: {
      type: Number,
    },
    TopLamination: {
      type: Boolean,
    },
    bottomLamination: {
      type: Boolean,
    },
    rollTypeBottom : {
      type:String,
    },
    rollTypeTop : {
      type:String,
    },
    status: {
      type: String,
      enum: ["Template", "Processing", "Completed"],
      default: "Template",
    },
  },
  {
    timestamps: true,
  }
);

const Pasting = mongoose.model("PastingTemp", pastingSchema);

export default Pasting;
