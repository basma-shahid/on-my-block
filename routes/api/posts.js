const express = require('express');
const router = express.Router();
const postCtrl = require('../../controllers/posts')

router.post('/', postCtrl.create)
router.get('/', postCtrl.getAll)

module.exports = router;