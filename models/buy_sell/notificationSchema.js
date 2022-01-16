let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let notifSchema = new Schema({
    userName: String,
    whetherSeen: Boolean,
    itemId: Number,
    itemName: String,
    text: String,
    timestamp: Date
});

let Notification = mongoose.model("notifications", notifSchema);

module.exports = Notification;
