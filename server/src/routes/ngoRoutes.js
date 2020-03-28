'use strict'

const express = require('express');
const router = express.Router();
const { celebrate } = require('celebrate');

const controller = require('../app/controllers/ngoController');

const validations = require('../validators/ngoValidator');

router.post('/register', celebrate(validations.register), controller.create);
router.post('/confirm', celebrate(validations.confirm), controller.confirm);
router.post('/forgotPassword', celebrate(validations.forgotPassword), controller.forgotPassword);
router.post('/updatepassword', celebrate(validations.updatepassword), controller.updatepassword);
router.get('/index', controller.index);
router.get('/validPasswordToken', celebrate(validations.validPasswordToken), controller.validPasswordToken);
router.delete('/delete', controller.delete);



module.exports = router;