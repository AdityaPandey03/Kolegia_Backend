import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    item_name: String,
    posted_by: String, //owner of product
    seller_user_id: Number,
    item_id: Number,
    price: Number,
    desciption: String,
    product_image: String,
  },
  {
    timestamps: true,
  }
);

const BuySellProduct = mongoose.model("products", productSchema);

export default BuySellProduct;
