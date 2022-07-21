import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import UsersService from './users.service'
import { IUserController } from './users.interface'
import ApiError from '@/apiError'
import os from 'os'
import { IJwt } from './token/token.interface'

const fingerprint = (req: Request): string => {
  return 'OS: ' + os.hostname() +
  '; CPU: ' + os.cpus()[0].model +
  '; Platform: ' + os.platform() +
  '; Version: ' + os.version() +
  '; HomeDir: ' + os.homedir() +
  '; IP: ' + req.ip + req.ips.join(', ') +
  '; endianness: ' + os.endianness()
}

class UsersController implements IUserController {
  private static instance = new UsersController()

  static getInstance (): UsersController { // паттерн singleton одиночка
    if (!UsersController.instance) {
      UsersController.instance = new UsersController()
    }
    return UsersController.instance
  }

  /// ////////////
  async registration (req: Request, res: Response, next: NextFunction) {
    try {
      const errorsValid = validationResult(req).array()
      if (errorsValid.length > 0) {
        return next(ApiError.badRequest(
          'Ошибка: ' +
          errorsValid.map((value) => value.msg).join(', '),
          'UsersController registration'))
      }
      const finger = fingerprint(req)
      const result = await UsersService.registration(req.body, req.ip, finger)
      res.cookie('refreshToken',
        result.result.refreshToken,
        { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }/// ////////////registration

  async login (req: Request, res: Response, next: NextFunction) {
    try {
      const errorsValid = validationResult(req).array()
      if (errorsValid.length > 0) {
        return next(ApiError.badRequest(
          'Ошибка: ' +
          errorsValid.map((value) => value.msg).join(', '),
          'UsersController login'))
      }
      const finger = fingerprint(req)
      const result = await UsersService.login(req.body, req.ip, finger)
      res.cookie('refreshToken',
        result.result.refreshToken,
        { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  } /// //////////////login

  async logout (req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies
      const result = await UsersService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.status(200).json(result)
    } catch (e) {
      next(e)
    }
  }

  async refresh (req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies
      const finger = fingerprint(req)
      const result =
        await UsersService.refresh(refreshToken, req.ip, finger)
      res.cookie('refreshToken',
        result.result.refreshToken,
        { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.status(200).json(result)
    } catch (e) {
      next(e)
    }
  }

  async activate (req: Request, res: Response, next: NextFunction) {
    try {
      const activateLink = req.params.link
      const result = await UsersService.activate(activateLink)
      const urlClient = process.env.CLIENT_URL || ''
      return res.header('Location', urlClient)
        .status(301).json(result)
    } catch (err) {
      next(err)
    }
  }

  async updateUserById (req: Request, res: Response, next: NextFunction) {
    try {
      const errorsValid = validationResult(req).array()
      if (errorsValid.length > 0) {
        return next(ApiError.badRequest(
          'Ошибка: ' +
          errorsValid.map((value) => value.msg).join(', '),
          'UsersController updateUserById'))
      }
      const id = +req.params.id
      const authUser = req.user as IJwt
      if (authUser.rolesId !== 1 && id !== authUser.id) {
        return next(ApiError.forbidden(
          'У вас нет доступа для изменения этого пользователя',
          'UsersController updateUserById'))
      }
      const result = await UsersService.updateUserById(id, req.body, authUser.rolesId)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async getUserById (req: Request, res: Response, next: NextFunction) {
    try {
      const errorsValid = validationResult(req).array()
      if (errorsValid.length > 0) {
        return next(ApiError.badRequest(
          'Ошибка: ' +
          errorsValid.map((value) => value.msg).join(', '),
          'UsersController deleteUserById'))
      }
      const id = +req.params.id
      const User = await UsersService.getUserById(id)
      return res.status(200).send(User)
    } catch (err) {
      next(err)
    }
  }

  async deleteUserById (req: Request, res: Response, next: NextFunction) {
    try {
      const errorsValid = validationResult(req).array()
      if (errorsValid.length > 0) {
        return next(ApiError.badRequest(
          'Ошибка: ' +
          errorsValid.map((value) => value.msg).join(', '),
          'UsersController deleteUserById'))
      }
      const id = +req.params.id
      const User = await UsersService.deleteUserById(id)
      return res.status(200).send(User)
    } catch (err) {
      next(err)
    }
  }

  async getUsers (req: Request, res: Response, next: NextFunction) {
    try {
      const errorsValid = validationResult(req).array()
      if (errorsValid.length > 0) {
        return next(ApiError.badRequest(
          'Ошибка: ' +
          errorsValid.map((value) => value.msg).join(', '),
          'UsersController getUsers'))
      }
      const limit = +(req.query.limit || 10)
      const page = +(req.query.page || 1)
      const listUsers = await UsersService.getUsers(limit, page)
      return res.status(200).json(listUsers)
    } catch (err) {
      next(err)
    }
  }

  async searchUsers (req: Request, res: Response, next: NextFunction) {
    try {
      // const start = new Date().getTime();
      const errorsValid = validationResult(req).array()
      if (errorsValid.length > 0) {
        return next(ApiError.badRequest(
          'Ошибка: ' +
          errorsValid.map((value) => value.msg).join(', '),
          'UsersController searchUsers'))
      }
      const nickname: string = String(req.query.nickname || '')
      const limit = +(req.query.limit || 10)
      const page = +(req.query.page || 1)
      const listUsers = await UsersService.searchUsers(nickname, limit, page)
      // const end = new Date().getTime();
      // logger.info(`время выполнения - ${end - start}ms`, {controller_users: 'searchUsers'})
      return res.status(200).send(listUsers)
    } catch (err) {
      next(err)
    }
  }
}

export default UsersController.getInstance()
