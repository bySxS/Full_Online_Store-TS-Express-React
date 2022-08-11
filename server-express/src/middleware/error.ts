import { NextFunction, Request, Response } from 'express'
import ApiError from '../apiError'
import logger from '../logger'
import os from 'os'
import {
  CheckViolationError, DataError, DBError,
  ForeignKeyViolationError,
  NotFoundError,
  NotNullViolationError,
  UniqueViolationError, ValidationError
} from 'objection'

const writeLogger = (message: string, status: number, module: string, req: Request) => {
  return logger.error(
    message +
    '; статус: ' + status +
    '; в модуле: ' + module +
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
  if (err === undefined) {
    next()
  }
  if (err instanceof ApiError) {
    if (err.status !== 401) {
      writeLogger(err.message, err.status, err.moduleLog, req)
    }
    return res.status(err.status)
      .json({
        success: false,
        message: err.message
      })
  }

  if (err instanceof ValidationError) {
    writeLogger(err.message + err.data, 400, err.type, req)
    switch (err.type) {
      case 'ModelValidation':
        return res.status(400)
          .json({
            success: false,
            message: err.message,
            type: err.type + err.data
          })
      case 'RelationExpression':
        return res.status(400)
          .json({
            success: false,
            message: err.message + 'RelationExpression'
          })
      case 'UnallowedRelation':
        return res.status(400)
          .json({
            success: false,
            message: err.message + err.type
          })
      case 'InvalidGraph':
        return res.status(400).json({
          message: err.message + err.type
        })
      default:
        return res.status(400).json({
          success: false,
          message: err.message + ' UnknownValidationError'
        })
    }
  }
  if (err instanceof NotFoundError) {
    writeLogger(err.message + ' NotFound', 400, err.type, req)
    return res.status(404)
      .json({
        success: false,
        message: err.message + ' NotFound'
      })
  }
  if (err instanceof UniqueViolationError) {
    writeLogger(err.message + ' UniqueViolation', 400, 'UniqueViolation', req)
    return res.status(409)
      .json({
        success: false,
        message: err.message + ' UniqueViolation',
        data: {
          columns: err.columns,
          table: err.table,
          constraint: err.constraint
        }
      })
  }
  if (err instanceof NotNullViolationError) {
    writeLogger(err.message + ' NotNullViolation', 400, 'NotNullViolation', req)
    return res.status(400)
      .json({
        success: false,
        message: err.message + ' NotNullViolation',
        data: {
          column: err.column,
          table: err.table
        }
      })
  }
  if (err instanceof ForeignKeyViolationError) {
    writeLogger(err.message + ' ForeignKeyViolation', 400, 'ForeignKeyViolation', req)
    return res.status(409)
      .json({
        success: false,
        message: err.message + ' ForeignKeyViolation',
        data: {
          table: err.table,
          constraint: err.constraint
        }
      })
  }
  if (err instanceof CheckViolationError) {
    writeLogger(err.message + ' CheckViolation', 400, 'CheckViolation', req)
    return res.status(400)
      .json({
        success: false,
        message: err.message + ' CheckViolation',
        data: {
          table: err.table,
          constraint: err.constraint
        }
      })
  }
  if (err instanceof DataError) {
    writeLogger(err.message + ' InvalidData', 400, 'InvalidData', req)
    return res.status(400)
      .json({
        success: false,
        message: err.message + ' InvalidData'
      })
  }
  if (err instanceof DBError) {
    console.log(err)
    writeLogger(err.message, 400, 'UnknownDatabaseError', req)
    return res.status(500)
      .json({
        success: false,
        message: 'UnknownDatabaseError'
      })
  }

  writeLogger('Непредвиденная ошибка: ' + err.toString(), 500, req.path, req)
  console.log(err)
  return res.status(500)
    .json({
      success: false,
      message: 'Непредвиденная ошибка!'
    })
}
