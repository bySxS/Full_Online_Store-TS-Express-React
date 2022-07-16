import { createLogger, transports, format } from 'winston'
const { timestamp, combine, errors, json } = format

export function buildProdLogger () {
  return createLogger({
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'logger/log/error.log', level: 'error', format: format.json() }),
      new transports.File({ filename: 'logger/log/combined.log', format: format.json() })
    ]
  })
}
