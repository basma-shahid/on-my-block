const Event = require('../models/event')
const User = require('../models/user')

module.exports = {
    create
}

//function receives the events from the browser and puts it in the db
async function create(req, res) {
    try {
        const event = await Event.create({
            name: req.body.name,
            location: req.body.location,
            user: req.user._id
        });
        console.log(event)
        console.log("this is the req.user", req.user)
        console.log("this is id", req.user._id)

        User.findById(req.user._id, function(err, user){
            user.events.push(event);
            user.save();
            console.log("this is req.user", User.events)
        })
        res.status(200).json('ok. event added to DB!')
    } catch(err) {
        res.json(err);
    }
}