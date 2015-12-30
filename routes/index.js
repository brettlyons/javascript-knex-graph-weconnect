var express = require('express');
var router = express.Router();
const knex = require('knex')(require('../knexfile')['development']);
const adjacencyList = require('../lib/adjacencyList').adjacencyList;
const findConnections = require('../lib/adjacencyList').findConnections;
/* GET home page. */
router.get('/', function(req, res, next) {
  knex('users').then(function (users) {
    res.render('index', { users: users });
  });
});

router.get('/users/:id', function(req, res, next) {
  knex('users').where({id: req.params.id}).first().then(function(user) {

    knex('connections')
      .select('user_id', 'users.name', 'other_id', 'others.name as other_name')
      .innerJoin('users', 'user_id', 'users.id')
      .innerJoin('users AS others', 'other_id', 'others.id')
      .then(function (connections) {
        var myList = adjacencyList(connections);
        var results = findConnections(myList, req.params.id);
        res.render('user', {user:user, list: myList, results:results});
      });
  });
});

module.exports = router;
