require('dotenv/config');
const knex = require('knex');
const configaration = require('../../knexfile');

const config = process.env.DBAMBIENT === 'development' ? (configaration.development) : process.env.DBAMBIENT === 'production' ? (configaration.production) : (configaration.test);

const connection = knex(config);
// npx knex migrate:latest
module.exports = connection;
