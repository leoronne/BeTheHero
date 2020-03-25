'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../app/controllers/ngoController');

router.post('/register', controller.create);
router.post('/confirm', controller.confirm);
router.get('/index', controller.index);
router.delete('/delete', controller.delete);



module.exports = router;