export default class ApiError extends Error {
  status: number = 0
  message: string = ''
  moduleLog: string = ''

  constructor (message: string, status: number, moduleLog: string) {
    super()
    this.message = message
    this.status = status
    this.moduleLog = moduleLog
  }

  static badRequest (
    message: string,
    moduleLog: string) {
    return new ApiError(message, 400, moduleLog)
  }

  static internalRequest (
    message: string,
    moduleLog: string) {
    return new ApiError(message, 500, moduleLog)
  }

  static forbidden (
    message: string,
    moduleLog: string) {
    return new ApiError(message, 403, moduleLog)
  }

  static UnauthorizedError (
    moduleLog: string) {
    return new ApiError(
      'Пользователь не авторизован или время сессии истекло',
      401,
      moduleLog)
  }
}
