import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config; } = {
  development: {
    client: "postgresql",
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'pass123',
      database: 'notification',
    },
    migrations: {
      directory: './src/_common/database/migrations',
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

module.exports = config;
