import mongoose from "mongoose";

let Schema = mongoose.Schema;

let notifSchema = new Schema({
    userName: String,
    targetUsername: String,
    type: String,
    whetherSeen: Boolean,
    itemId: Number,
    itemName: String,
    text: String,
    timestamp: Date
});

let Notification = mongoose.model("notifications", notifSchema);

export default Notification;