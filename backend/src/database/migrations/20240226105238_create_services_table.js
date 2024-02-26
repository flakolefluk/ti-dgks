/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('services', (table) => {
    table.increments('id');
    table.text('service_name').notNullable();
    table.text('person_name').notNullable();
    table.decimal('latitude', 10, 8).notNullable().unsigned();
    table.decimal('longitude', 11, 8).notNullable().unsigned();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('services');
};
