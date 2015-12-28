var express = require('express');
var router = express.Router();
const knex = require('knex')(require('../knexfile')['development']);

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('users').then(function (users) {
    res.render('index', { users: users });
  });
});

module.exports = router;
