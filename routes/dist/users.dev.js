"use strict";

var express = require('express');

var router = express.Router();

var usersCtrl = require('../controllers/users');

router.post('/signup', usersCtrl.create);
router.post('/login', usersCtrl.login);
module.exports = router;
//# sourceMappingURL=users.dev.js.map
