"use strict";

var express = require('express');

var router = express.Router();

var eventCtrl = require('../../controllers/events'); //creat gitAll router


router.post('/', eventCtrl.create);
router.get('/', eventCtrl.eventForUsers);
router.get('/', eventCtrl.getAll);
module.exports = router;
//# sourceMappingURL=events.dev.js.map
