// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/database/db.sqlite"
    },
    migrations: {
      directory: "./src/database/migrations"
    },
    useNullAsDefault: true
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: "./src/database/db-prod.sqlite"
    },
    migrations: {
      directory: "./src/database/migrations"
    },
    useNullAsDefault: true
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: "./src/database/db-test.sqlite"
    },
    migrations: {
      directory: "./src/database/migrations"
    },
    useNullAsDefault: true
  }
};
