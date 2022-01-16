import mongoose from "mongoose";

const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
  itemName: String,
  itemId: Number,
  postedBy: String, //owner of product
  postedById: Number, //for the id of the user
  itemPictures: [{ 
    img: { 
      type: String, 
      required: false,
      default:
            "https://res.cloudinary.com/geekysrm/image/upload/v1542221619/default-user.png",
    } 
  }],
  question: { type: String, required: true }, //validation question
  description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const lostFoundItem = mongoose.model("items", itemSchema);

export default lostFoundItem;


