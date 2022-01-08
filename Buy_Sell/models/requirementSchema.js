const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requirementSchema = new Schema(
{
    req_title: String,
    required_by: String,
    description: String,
    timestamp: Date
});

let Requirement = mongoose.model('requirement', requirementSchema);

module.exports = Requirement;