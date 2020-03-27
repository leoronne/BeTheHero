require('dotenv/config');
const knex = require('knex');
const configaration = require('../../knexfile');

const connection = process.env.DBAMBIENT === 'development' ? knex(configaration.development):knex(configaration.production);
// npx knex migrate:latest
module.exports = connection;
