import logger from '../logger'

interface IKnexConfig {
    [key: string]: object;
}

// process.env при миграции не работает!
const host: string = 'localhost'
const port: string = '3306'
const user: string = 'sxs'
const password: string = '123456789s'
const database: string = 'online_store'

const defaultConf = {
  client: 'mysql',
  connection: { // migrations
    host,
    port,
    user,
    password,
    database,
    charset: 'utf8'
  }
}

const knexConfig: IKnexConfig = {
  test: {
    ...defaultConf
  },
  development: {
    ...defaultConf
  },
  production: {
    ...defaultConf,
    connection: {
      host: 'mysql'
    }
  },
  migrations: {
    // directory: '../db/migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: '../db/seeds'
  },
  pool: {
    min: 2,
    max: 5
  },
  log: {
    error (message: string) {
      logger.error('knex mysql error: ' + message, { knex: 'error' })
    },
    debug (message: string) {
      logger.info('knex mysql debug: ' + message, { knex: 'debug' })
    },
    deprecate (message: string) {
      logger.info('knex mysql deprecate: ' + message, { knex: 'deprecate' })
    },
    warn (message: string) {
      logger.info('knex mysql warn: ' + message, { knex: 'warn' })
    }
  }

}

export default knexConfig

module.exports = { // для migrate: make только с этим работает
  test: {
    client: 'mysql',
    connection: { // migrations
      host,
      port,
      user,
      password,
      database,
      charset: 'utf8'
    }
  },
  development: {
    client: 'mysql',
    connection: { // migrations
      host,
      port,
      user,
      password,
      database,
      charset: 'utf8'
    }
  },
  production: {
    client: 'mysql',
    connection: {
      host: 'mysql', // название контейнера докер
      port,
      user,
      password,
      database,
      charset: 'utf8'
    }
  },
  migrations: {
    // directory: '../db/migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: '../db/seeds'
  },
  pool: {
    min: 2,
    max: 5
  },
  log: {
    error (message: string) {
      logger.error('knex mysql error: ' + message, { knex: 'error' })
    },
    debug (message: string) {
      logger.info('knex mysql debug: ' + message, { knex: 'debug' })
    }
  }

}
