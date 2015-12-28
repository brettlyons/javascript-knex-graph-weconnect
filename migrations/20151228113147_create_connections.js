
exports.up = function(knex, Promise) {
  return knex.schema.createTable('connections', function(table) {
    table.increments();
    table.integer('user_id').references('id').inTable('users').onDelete('cascade');
    table.integer('other_id').references('id').inTable('users').onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('connections');
};
