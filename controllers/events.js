const Event = require('../models/event')
const User = require('../models/user')
//creat getAll to get all events
module.exports = {
    create,
    getAll,
    eventForUsers
}

//function receives the events from the browser and puts it in the db
async function create(req, res) {
    try {
        const event = await Event.create({
            name: req.body.name,
            location: req.body.location,
            lat: req.body.lat,
            lng: req.body.lng,
            time: req.body.time,
            user: req.user._id,
            date: req.body.date,
            details: req.body.details

        });
        console.log(event)
        console.log("this is the req.user", req.user)
        console.log("this is id", req.user._id)

        User.findById(req.user._id, function (err, user) {
            user.events.push(event);
            user.save();
            console.log("this is req.user", User.events)
        })
        res.status(200).json('ok. event added to DB!')
    } catch (err) {
        res.json(err);
    }
}

async function getAll(req, res) {
    try {
        let events = await Event.find({})

        res.status(200).json(events)
    } catch (err) {
        res.json(err);
    }
}

async function eventForUsers(req,res){
    try{
        const event = await Event.find({user: req.user._id})
        .populate('user')
        .exec();
        console.log("this is the", event)
        console.log("this is users id:", req.user._id)
        res.status(200).json(event);
        
        
    } catch(err){
        console.log(err);
    }
}