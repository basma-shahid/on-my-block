const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');


router.get('/:id', usersCtrl.find);
router.post('/signup', usersCtrl.create);
router.post('/login', usersCtrl.login);


module.exports = router;


