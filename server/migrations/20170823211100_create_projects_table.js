exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.text('image');
    table.json('nodes');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('projects');
};
