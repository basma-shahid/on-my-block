const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    id: String,
    title: String,
    description: String,
    categories: Array,
    //this is the name of the user who created the post
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Post", postSchema)