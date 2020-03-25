'use strict';
const express = require('express');
const router = express.Router();

var Development = ['Be The Hero'];
Development.push({
   'Made by': 'Leonardo Ronne',
    GitHub: 'https://github.com/leoronne'
})


const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        Development
    });
});

module.exports = router;