const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requirementSchema = new Schema(
{
    title: String,
    required_by: Number,  //user_id of the person who is posting the requirement
    description: String,
    timestamp: Date
});

let Requirement = mongoose.model('requirement', requirementSchema);

module.exports = Requirement;