const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: String,
    location: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
    //this event having one user that created it
}, {
    timestamps: true,
});

module.exports = mongoose.model("Event", eventSchema)