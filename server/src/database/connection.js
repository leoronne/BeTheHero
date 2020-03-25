const knex = require('knex');
const configaration = require('../../knexfile');

const connection = knex(configaration.development);
// npx knex migrate:latest
module.exports = connection;
