import logger from '../logger'
import Queue from 'bull'
import { UsersModel } from '../users/users.model'
import { IError } from '../interface'

const REDIS_HOST: string = process.env.REDIS_QUEUE_HOST || 'localhost'
const REDIS_PORT: number = Number(process.env.REDIS_QUEUE_PORT) || 6379
const REDIS_URL = 'redis://' + REDIS_HOST + ':' + REDIS_PORT
export const userQueueDB = new Queue('user-db-queue', REDIS_URL)// db0 redis

// userQueueDB.process('clearCache', async (job, done) => {
//
// })

userQueueDB.process('deleteUser', async (job, done) => {
  // job.progress(0)
  try {
    console.log('тут1', job.data)
    await UsersModel.query().deleteById(job.data.id)
    done(null, { message: `Пользователь с ID ${job.data.id} успешно удалён` })
    logger.info(`Пользователь ${job.data.id} успешно удалён`)
  } catch (e) {
    const err = e as IError
    logger.error(err.message, { userQueueDB: job.name })
  }

  // job.progress(100)
})

userQueueDB.on('active', (job) => {
  logger.info(job.name + ' started', { userQueueDB: job.name })
})

userQueueDB.on('completed', function (job) {
  // Job finished we remove it
  logger.info(job.name + ' completed', { userQueueDB: job.name })
  job.remove()
})

userQueueDB.on('failed', function (job, err) {
  // Unexpected error happen. We report it in our external error handling (rollbar, logentries, mails...) before removing it
  logger.error(err.message, { userQueueDB: 'failed' + job.name })
  job.remove()
})

userQueueDB.on('error', function (error) {
  console.log(error)
  // logger.error(error, { userQueueDB: 'error' })
})

userQueueDB.on('resumed', function () {
  logger.info('userQueueDB started', { userQueueDB: 'resumed' })
})

userQueueDB.resume()
