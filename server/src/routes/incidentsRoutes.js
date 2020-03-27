'use strict'

const express = require('express');
const router = express.Router();
const { celebrate } = require('celebrate');

const controller = require('../app/controllers/incidentsController');
const validations = require('../validators/incidentsValidator');

router.post('/create', celebrate(validations.create), controller.create);
router.get('/index', celebrate(validations.index), controller.index);
router.delete('/delete', celebrate(validations.delete), controller.delete);

module.exports = router;