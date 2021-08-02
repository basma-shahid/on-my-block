const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true, // trims whitespace
        lowercase: true,
        required: true
    }, 
    password: {
        type: String,
        trim: true,
        minLength: 3,
        required: true
    },   
    events: [
        {type: Schema.Types.ObjectId,
        ref: 'Event'}
    ], //this user having many events that they created
}, {
    timestamps: true,
    // mongoose trick to not send passwords to clients! (even though they'll be hashed)
    toJSON: {
        transform: function(doc, ret) {
          delete ret.password;
          return ret;
        }
    }
})


module.exports = mongoose.model("User", userSchema)
