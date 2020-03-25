exports.up = function(knex) {
  return knex.schema.createTable('INCIDENTS', function(table) {
    table.increments();

    table.string('TITLE').notNullable();
    table.string('DESCRIPTION').notNullable();
    table.decimal('VALUE').notNullable();

    table.string('NGO_ID').notNullable();
    table
      .foreign('NGO_ID')
      .references('ID')
      .inTable('NGO');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('INCIDENTS');
};
