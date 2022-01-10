let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let commentSchema = new Schema({
	user_id: String, // person who comments
    item_id: Number,    
	text: String, 		// comment content
	item_name: String, 
	posted_by: String,    // owner of the product
	timestamp: Date
});

let Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;

