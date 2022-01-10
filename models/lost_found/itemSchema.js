let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let itemSchema = new Schema({
  item_name: String,
  item_id: Number,
  posted_by: String, //owner of product
  item_pictures: [{ img: { type: String, required: false } }],
  question: { type: String, required: true }, //validation question
  desciption: { type: String, required: true },
  timestamp: Date, //posted number of days ago
});

let Item = mongoose.model("items", itemSchema);

module.exports = Item;


