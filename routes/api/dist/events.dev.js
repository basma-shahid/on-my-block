"use strict";

var express = require('express');

var router = express.Router();

var eventCtrl = require('../../controllers/events');

router.post('/', eventCtrl.create);
router.get('/', eventCtrl.eventForUsers);
module.exports = router;
//# sourceMappingURL=events.dev.js.map
