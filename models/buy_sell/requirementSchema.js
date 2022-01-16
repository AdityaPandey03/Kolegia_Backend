import mongoose from "mongoose";

const Schema = mongoose.Schema;

const requirementSchema = new Schema(
  {
    title: String,
    requiredById: Number, //user_id of the person who is posting the requirement
    description: String,
  },
  {
    timestamps: true,
  }
);

let Requirement = mongoose.model("requirement", requirementSchema);

export default Requirement;
