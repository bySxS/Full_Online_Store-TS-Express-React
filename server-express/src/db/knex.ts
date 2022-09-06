import { config } from 'dotenv'
import path from 'path'
import logger from '../logger'

interface IKnexConfig {
    [key: string]: object;
}

const knexConfig: IKnexConfig = {
  development: {
    client: 'mysql',
    connection: { // migrations
      host: 'localhost',
      port: 3306,
      user: 'sxs',
      password: '123456789s',
      database: 'online_store',
      charset: 'utf8'
    }
  },
  production: {
    client: 'mysql',
    connection: { // migrations
      host: 'mysql',
      port: 3306,
      user: 'sxs',
      password: '123456789s',
      database: 'online_store',
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

config({
  debug: false,
  override: true,
  path: path.resolve(__dirname, '../..', '.env')
})

console.log('MYSQL_HOST', process.env.MYSQL_HOST)

module.exports = { // для migrate: make только с этим работает
  development: {
    client: 'mysql',
    connection: { // migrations
      host: process.env.MYSQL_HOST || 'mysql',
      port: process.env.MYSQL_PORT || 3306,
      user: process.env.MYSQL_USER || 'sxs',
      password: process.env.MYSQL_PASS || '123456789s',
      database: process.env.MYSQL_DB_NAME || 'online_store',
      charset: 'utf8'
    }
  },
  production: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_HOST || 'mysql', // название контейнера докер
      port: process.env.MYSQL_PORT || 3306,
      user: process.env.MYSQL_USER || 'sxs',
      password: process.env.MYSQL_PASS || '123456789s',
      database: process.env.MYSQL_DB_NAME || 'online_store',
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
