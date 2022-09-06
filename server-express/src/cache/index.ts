import { createClient } from 'redis'
import { promisifyAll } from 'bluebird'
import logger from '@/logger'

console.log('REDIS_CACHE_HOST', process.env.REDIS_CACHE_HOST)
const REDIS_HOST: string = process.env.REDIS_CACHE_HOST || 'localhost'
const REDIS_PORT: number = Number(process.env.REDIS_CACHE_PORT) || 6379
const REDIS_URL = 'redis://' + REDIS_HOST + ':' + REDIS_PORT
const client = createClient({
  url: REDIS_URL,
  database: 1
})// db1 redis
client.connect()
  .then(() => {
    logger.info('Redis connected')
  })
  .catch(e => {
    logger.error('Redis error ' + e.toString(), { db: 'Redis' })
  })

export const cacheRedisDB = promisifyAll(client)
