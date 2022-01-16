import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    itemName: String,
    postedBy: String, //owner of product
    sellerUserId: Number,
    itemId: Number,
    price: Number,
    description: String,
    productImg: [
      {
        img: {
          type: String,
          default:
            "https://res.cloudinary.com/geekysrm/image/upload/v1542221619/default-user.png",
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const BuySellProduct = mongoose.model("products", productSchema);

export default BuySellProduct;
