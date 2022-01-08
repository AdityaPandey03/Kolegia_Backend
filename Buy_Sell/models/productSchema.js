let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let productSchema = new Schema({
    item_name: String,
    posted_by: String,  //owner of product
    item_id: Number,
    price: Number,
    desciption: String,
    timestamp: Date,   //posted number of days ago
    product_image: Boolean,
});

let Product = mongoose.model('products', productSchema);

module.exports = Product;
