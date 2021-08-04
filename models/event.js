const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// add lat lng time 
const eventSchema = new Schema({
    name: String,
    location: String,
    lat: Number,
    lng: Number,
    time: Date,
    // this is the time the event was created
    date: Date,
    //this is the date for the event if applicable
    details: String,
    //this is the detail for the event
    user: { type: Schema.Types.ObjectId, ref: 'User' }
    //this event having one user that created it
}, {
    timestamps: true,
});

module.exports = mongoose.model("Event", eventSchema)