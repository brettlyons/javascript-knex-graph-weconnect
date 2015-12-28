var express = require('express');
var router = express.Router();
const knex = require('knex')(require('../knexfile')['development']);

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('users').then(function (users) {
    res.render('index', { users: users });
  });
});

router.get('/users/:id', function(req, res, next) {
  knex('users').where({id: req.params.id}).first().then(function(user) {

    knex('connections')
      .innerJoin('users', 'other_id', 'users.id')
      .where({user_id: user.id})
      .then(function (connections) {

        knex('connections')
          .where({other_id: user.id})
          .innerJoin('users', 'user_id', 'users.id')
          .then(function (connections2) {
            res.render('user', { user: user, connections: connections.concat(connections2) });
          });
      });
  });
});

module.exports = router;
