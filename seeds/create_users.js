
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(), 
    knex('connections').del(),

    // Inserts seed entries
    knex('users').insert({name:'Alfred'}).returning('id'),
    knex('users').insert({name:'Barnaby'}).returning('id'),
    knex('users').insert({name:'Colleen'}).returning('id'),
    knex('users').insert({name:'Darby'}).returning('id'),
    knex('users').insert({name:'Eleanor'}).returning('id'),
    knex('users').insert({name:'Fernando'}).returning('id')

  ).then(function (results) {
    var aId = results[2][0];
    var bId = results[3][0];
    var cId = results[4][0];
    var dId = results[5][0];
    var eId = results[6][0];
    var fId = results[7][0];
    
    return Promise.join(
      knex('connections').insert({user_id: aId, other_id: dId}),
      knex('connections').insert({user_id: aId, other_id: cId}),
      knex('connections').insert({user_id: bId, other_id: dId}),
      knex('connections').insert({user_id: eId, other_id: fId})
    );
  });
};
