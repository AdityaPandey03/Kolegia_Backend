let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let connectSchema = new Schema({
    itemId: Number, 
    itemName: String,   
	userId: Number, // person who comments
    belongsToId:Number, // owner
    question:String, // question that was posted by owner
    answer:String, // answer to be posted by user who finds it
	timestamp: Date
});

let Connect = mongoose.model('connects', connectSchema);

module.exports = Connect;

