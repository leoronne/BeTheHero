require('dotenv/config');
const knex = require('knex');
const configaration = require('../../knexfile');

const dbconfig = process.env.DBAMBIENT === 'development' ? (configaration.development) : (configaration.production);

const connection = knex(dbconfig);
// npx knex migrate:latest
module.exports = connection;
