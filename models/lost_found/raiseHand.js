let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let connectSchema = new Schema({
    item_id: Number, 
    item_name: String,   
	user_id: Number, // person who comments
    belongs_to:Number, // owner
    question:String, // question that was posted by owner
    answer:String, // answer to be posted by user who finds it
	timestamp: Date
});

let Connect = mongoose.model('connects', connectSchema);

module.exports = Connect;

