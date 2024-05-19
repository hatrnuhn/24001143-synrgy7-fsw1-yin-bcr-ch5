// cli usage: dotenv -e ./.env -- npx knex migrate:latest {migrationfile} --knexfile src/knexfile.ts
// it uses globally installed dotenv-cli
const config = {
  development: {
    client: "postgresql",
    connection: process.env.POSTGRES_URL,
    migrations: {
      directory: './knex/migrations'
    },
    seeds: {
      directory: './knex/seeds' 
    }
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
}};

export default config;