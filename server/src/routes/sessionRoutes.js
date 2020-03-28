'use strict'

const express = require('express');
const router = express.Router();
const { celebrate } = require('celebrate');

const controller = require('../app/controllers/sessionController');
const validations = require('../validators/sessionValidator');

router.post('/login', celebrate(validations.login), controller.create);
router.post('/sendemailverification', celebrate(validations.sendEmail), controller.sendEmail);
router.get('/validatetoken', celebrate(validations.validateToken), controller.validateToken);

module.exports = router;