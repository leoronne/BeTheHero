'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../app/controllers/sessionController');

router.post('/login', controller.create);
router.get('/validatetoken', controller.validateToken);

module.exports = router;