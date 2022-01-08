let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let notifSchema = new Schema({
    user_name: String,
    whether_seen: Boolean,
    item_id: Number,
    item_name: String,
    text: String,
    timestamp: Date
});

let Notification = mongoose.model("notifications", notifSchema);

module.exports = Notification;
