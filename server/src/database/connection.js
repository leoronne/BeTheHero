require('dotenv/config');
const knex = require('knex');
const configaration = require('../../knexfile');

const config = process.env.DBAMBIENT === 'development' ? (configaration.development) : (configaration.production);

const connection = knex(config);
// npx knex migrate:latest
module.exports = connection;
