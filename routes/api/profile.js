const express = require('express');
const router = express.Router();
const eventCtrl = require('../../controllers/events')


router.get('/', eventCtrl.eventForUsers)
router.delete('/:id', eventCtrl.deleteOne)

module.exports = router;