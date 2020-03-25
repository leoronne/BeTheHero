'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../app/controllers/incidentsController');

router.post('/create', controller.create);
router.get('/index', controller.index);
router.delete('/delete', controller.delete);

module.exports = router;