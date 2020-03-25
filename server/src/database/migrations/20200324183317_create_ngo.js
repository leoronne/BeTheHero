exports.up = function(knex) {
  return knex.schema.createTable('NGO', function(table) {
    table.string('ID').primary();
    table.string('EMAIL').notNullable().unique();
    table.string('WHATSAPP').notNullable().unique();
    table.string('PASSWORD').notNullable();
    table.string('NAME').notNullable();
    table.string('CITY').notNullable();
    table.string('UF', 2).notNullable();
    table.string ('STATUS').defaultTo('Inactive');
  });
};

exports.down = function(knex) {
  knex.schema.dropTable('NGO');
};
