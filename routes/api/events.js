const express = require('express');
const router = express.Router();
const eventCtrl = require('../../controllers/events')
//creat gitAll router
router.post('/', eventCtrl.create)
router.get('/', eventCtrl.eventForUsers)
router.get('/', eventCtrl.getAll)

module.exports = router;