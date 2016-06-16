var express = require('express');
var router = express.Router();
var issues = require('../service/issues.js');

//Non secure services
router.get('/', issues.getAll);


module.exports = router;