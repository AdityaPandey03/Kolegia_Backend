import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    postedBy: {
      type: String,
    },
    sellerUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    itemImages: [
      {
        img: {
          type: String,
          required: false,
          default:
            "https://res.cloudinary.com/geekysrm/image/upload/v1542221619/default-user.png",
        },
        cloudinaryId: {
          type: String,
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
