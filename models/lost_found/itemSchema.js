import mongoose from "mongoose";

const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
  item_name: String,
  item_id: Number,
  posted_by: String, //owner of product
  id_posted_by: Number, //for the id of the user
  item_pictures: [{ img: { type: String, required: false } }],
  question: { type: String, required: true }, //validation question
  description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const lostFoundItem = mongoose.model("items", itemSchema);

export default lostFoundItem;


