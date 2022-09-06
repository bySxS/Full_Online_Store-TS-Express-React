import { knex, Knex } from 'knex'
import knexConfig from './knex'

const environment: string = process.env.NODE_ENV || 'development'
const config: Knex.Config = knexConfig[environment]

export const dbKnex = knex(config)
