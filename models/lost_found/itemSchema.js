import mongoose from "mongoose";

const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    postedBy: {
      type: String,
    },
    postedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    itemPictures: [
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
    question: { type: String, required: true }, //validation question
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const lostFoundItem = mongoose.model("items", itemSchema);

export default lostFoundItem;
