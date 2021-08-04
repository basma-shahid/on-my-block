"use strict";

var Event = require('../models/event');

var User = require('../models/user');

module.exports = {
  create: create,
  eventForUsers: eventForUsers
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

function eventForUsers(req, res) {
  var event;
  return regeneratorRuntime.async(function eventForUsers$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Event.find({
            user: req.params._id
          }).populate('user').exec());

        case 3:
          event = _context2.sent;
          console.log(event);
          res.status(200).json(event);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}
//# sourceMappingURL=events.dev.js.map
