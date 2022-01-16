let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let commentSchema = new Schema({
	userId: String, // person who comments
    itemId: Number,    
	text: String, 		// comment content
	itemName: String, 
	postedBy: String,
	postedById: Number,    // owner of the product
	timestamp: Date
});

let Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;

