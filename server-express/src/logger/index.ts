import { buildDevLogger } from './dev-logger'
import { buildProdLogger } from './prod-logger'
import { Logger } from 'winston'

let logger: Logger
const environment: string = process.env.NODE_ENV || 'development'
if (environment === 'development') {
  logger = buildDevLogger()
} else {
  logger = buildProdLogger()
}

export default logger
