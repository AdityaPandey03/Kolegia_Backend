import mongoose from "mongoose";

const Schema = mongoose.Schema;

const requirementSchema = new Schema(
  {
    title: {
      type: String,
    },
    requiredById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let Requirement = mongoose.model("requirement", requirementSchema);

export default Requirement;
