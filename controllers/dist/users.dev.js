"use strict";

var user = require('../models/user');

var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

var SALT_ROUNDS = 6;
module.exports = {
  create: create,
  login: login
};

function create(req, res) {
  var hashedPassword, _user, token;

  return regeneratorRuntime.async(function create$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(bcrypt(req.body.password, SALT_ROUNDS));

        case 3:
          hashedPassword = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
          }));

        case 6:
          _user = _context.sent;
          token = jwt.sign({
            user: _user
          }, process.env.SECRET, {
            expiresIn: '72h'
          });
          res.json(token);
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          res.status(500).json(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function login(req, res) {
  var _user2, token;

  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 3:
          _user2 = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, _user2.password));

        case 6:
          if (_context2.sent) {
            _context2.next = 8;
            break;
          }

          throw new Error();

        case 8:
          token = jwt.sign({
            user: _user2
          }, process.env.SECRET, {
            expiresIn: '72h'
          });
          res.json(token);
          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json('Wrong Credentials');

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
}
//# sourceMappingURL=users.dev.js.map
