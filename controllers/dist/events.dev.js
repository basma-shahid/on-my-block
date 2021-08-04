"use strict";

var Event = require('../models/event');

var User = require('../models/user'); //creat getAll to get all events


module.exports = {
  create: create,
  eventForUsers: eventForUsers,
  getAll: getAll
}; //function receives the events from the browser and puts it in the db

function create(req, res) {
  var event;
  return regeneratorRuntime.async(function create$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Event.create({
            name: req.body.name,
            location: req.body.location,
            lat: req.body.lat,
            lng: req.body.lng,
            time: req.body.time,
            user: req.user._id
          }));

        case 3:
          event = _context.sent;
          console.log(event);
          console.log("this is the req.user", req.user);
          console.log("this is id", req.user._id);
          User.findById(req.user._id, function (err, user) {
            user.events.push(event);
            user.save();
            console.log("this is req.user", User.events);
          });
          res.status(200).json('ok. event added to DB!');
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          res.json(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getAll(req, res) {
  var events;
  return regeneratorRuntime.async(function getAll$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Event.find({}));

        case 3:
          events = _context2.sent;
          res.status(200).json(events);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.json(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function eventForUsers(req, res) {
  var event;
  return regeneratorRuntime.async(function eventForUsers$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Event.find({
            user: req.params._id
          }).populate('user').exec());

        case 3:
          event = _context3.sent;
          console.log(event);
          res.status(200).json(event);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
}
//# sourceMappingURL=events.dev.js.map