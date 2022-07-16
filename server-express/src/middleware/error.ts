import { NextFunction, Request, Response } from 'express'
import ApiError from '../apiError'
import logger from '../logger'
import os from 'os'

const writeLogger = (message: string, status: number, module: string, req: Request) => {
  return logger.error(
    message +
    ' статус: ' + status +
    ' в модуле: ' + module +
    '; путь: ' + req.hostname + req.path +
    '; ip: ' + req.ip +
    '; OS: ' + os.hostname() +
    '; CPU: ' + os.cpus()[0].model +
    '; Platform: ' + os.platform() +
    '; Version: ' + os.version() +
    '; HomeDir: ' + os.homedir() +
    '; IP: ' + req.ip + req.ips.join(', '),
    { errorRequest: module })
}

export const errorApiMiddleware = (err: ApiError | Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    if (err.status !== 401) {
      writeLogger(err.message, err.status, err.moduleLog, req)
    }
    return res.status(err.status)
      .json({ success: false, message: err.message })
  }
  writeLogger('Непредвиденная ошибка: ' + err.toString(), 500, req.path, req)
  return res.status(500)
    .json({ success: false, message: 'Непредвиденная ошибка!' })
}
