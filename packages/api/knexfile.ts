// Update with your config settings.
import { DB } from './config'

interface KnexConfig {
  [key: string] : object;
}

const knexConfig: KnexConfig = {
  development: {
    client: 'postgresql',
    connection: {
      database: DB.name,
      user:     DB.username,
      password: DB.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: DB.name,
      user:     DB.username,
      password: DB.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: DB.name,
      user:     DB.username,
      password: DB.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  }

};

export default knexConfig