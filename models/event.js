const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// add lat lng time 
const eventSchema = new Schema({
    name: String,
    location: String,
    lat: Number,
    lng: Number,
    time: Date,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
    //this event having one user that created it
}, {
    timestamps: true,
});

module.exports = mongoose.model("Event", eventSchema)