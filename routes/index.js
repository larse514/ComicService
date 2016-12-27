var express = require('express');
var router = express.Router();
var issues = require('../service/issues')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index', "hello world");
});
router.get('/healthCheck', function(req, res, next) {
  res.send('index', "trying aagain");
});

router.get('/issues',issues.findByQuery);

module.exports = router;
