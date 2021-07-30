const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    events: [
        {type: Schema.Types.ObjectId,
        ref: 'Event'}
    ] //this user having many events that they created

})

module.exports = mongoose.model("User", userSchema)
