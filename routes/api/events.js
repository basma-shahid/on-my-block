const express = require('express');
const router = express.Router();
const eventCtrl = require('../controllers/events')

router.post('/', eventCtrl.create)

module.exports = router;