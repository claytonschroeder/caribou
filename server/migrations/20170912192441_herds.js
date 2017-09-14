exports.up = function(knex, Promise) {
  return knex.schema.createTable('herds', (table) => {
    table.increments('id').primary();
    table.string('scientific_name');
    table.string('herd_name');
    table.string('coords', 750);
    table.string('eco_type');
    table.string('status');
    table.integer('population');
    table.integer('last_survey');
    table.integer('range');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('herds');
};
