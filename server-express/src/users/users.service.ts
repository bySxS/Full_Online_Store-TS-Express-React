import { IUsers, IUserService, IUsersFilesArray } from './users.interface'
import { IMessage } from '@/interface'
import UsersModel from './users.model'
import ApiError from '@/apiError'
import { compareSync, hashSync } from 'bcryptjs'
import { v4 } from 'uuid'
// import { cacheRedisDB } from '../cache'
// import milliseconds from 'milliseconds'
import MailService from '@/service/mail.service'
import RolesService from './roles/roles.service'
import TokenService from './token/token.service'
import { IDtoToken } from './token/token.interface'
import path from 'path'
import fs from 'fs-extra'
import { div } from '@/service/math.service'
import { delFile, saveFile } from '@/service/file.service'

class UsersService implements IUserService {
  private static instance = new UsersService()

  static getInstance (): UsersService { // singleton
    if (!UsersService.instance) {
      UsersService.instance = new UsersService()
    }
    return UsersService.instance
  }

  // registration ///////////////////////////////////////////////

  async updAvatar (
    id: number,
    DtoFile: IUsersFilesArray | null,
    delAvatar: boolean = false,
    userFind: UsersModel | undefined = undefined
  ): Promise<string> {
    if (!id || isNaN(id)) {
      throw ApiError.badRequest(
        'ID пользователя не верный, для обновления аватарки',
        'UsersService updAvatar')
    }
    const numberDir = div(id, 100)
    const pathDir = path.resolve(
      __dirname, '../..', 'static/user_avatar', String(numberDir)
    )
    fs.mkdirsSync(pathDir)
    let fileNameAvatar = ''
    if (userFind) {
      fileNameAvatar = await delFile(Boolean(delAvatar), userFind.avatar, pathDir)
    }
    if (DtoFile) {
      const { avatar } = DtoFile
      fileNameAvatar = await saveFile(id, pathDir, avatar, fileNameAvatar, 'avatar')
    }
    const result = await UsersModel.query()
      .where({ id })
      .update({
        avatar: fileNameAvatar
      })
    if (!result) {
      throw ApiError.badRequest(
        `Аватарка для пользователя с id${id} не обновлена`,
        'UsersService updAvatar')
    }
    return `Аватарка для пользователя с id${id} успешно обновлена`
  }

  async registration (
    Dto: IUsers,
    ip: string,
    fingerprint: string,
    DtoFile: IUsersFilesArray
  ): Promise<IMessage> {
    const {
      nickname, isSubscribeToNews,
      fullName, email,
      password, city,
      address, deliveryAddress, phoneNumber
    } = Dto

    const rolesId = 3
    const userNickname = await UsersModel.query()
      .findOne('nickname', nickname)
      .select('nickname')
    if (userNickname) {
      throw ApiError.badRequest(
        `Пользователь с именем ${nickname} уже существует`,
        'UsersService registration')
    }
    const userEmail = await UsersModel.query()
      .findOne('email', email)
      .select('email')
    if (userEmail) {
      throw ApiError.badRequest(
        `Пользователь с почтовым адресом ${email} уже существует`,
        'UsersService registration')
    }
    if ((rolesId < 1) && (rolesId > 3)) {
      throw ApiError.badRequest(
        'Такой группы нет',
        'UsersService registration')
    }

    const hashPassword = hashSync(password, 7)
    const activateLink = v4().toString()
    const user = await UsersModel.query()
      .insert({
        nickname,
        email,
        fullName,
        rolesId,
        password: hashPassword,
        city,
        address,
        deliveryAddress,
        phoneNumber,
        isActivated: false,
        registrationIp: ip,
        activateLink,
        isSubscribeToNews
      })
      .select('*')
    if (!user) {
      throw ApiError.badRequest(
        'Ошибка при регистрации',
        'UsersService registration')
    }
    const avatarInfo = await this.updAvatar(user.id, DtoFile)
    await MailService.sendActivationMail(email, activateLink)
    const roles = await RolesService.getRoleById(user.rolesId)
    const token = TokenService.generateTokens(
      user.id,
      user.nickname,
      user.rolesId,
      roles.result.nameEng
    )
    const dtoToken: IDtoToken = {
      userId: user.id,
      refreshToken: token.refreshToken,
      ip,
      fingerprint
    }
    const tokenData = await TokenService.saveToken(dtoToken)
    const result = { token, user }
    return {
      success: true,
      result,
      message: `Пользователь ${nickname} успешно зарегистрирован; ${avatarInfo}; ${tokenData.message}`
    }
  }

  // login ///////////////////////////////////////////////

  async login (
    Dto: IUsers, ip: string, fingerprint: string
  ): Promise<IMessage> {
    const { nickname, password } = Dto
    const user = await this.getUserByNickname(nickname)
    if (!user.result) {
      throw ApiError.badRequest(
        user.message,
        'UsersService getUserByNickname')
    }
    const validPassword = compareSync(password, user.result.password)
    if (!validPassword) {
      throw ApiError.badRequest(
        'Введен неверный пароль или логин',
        'UsersService login')
    }
    const token = TokenService.generateTokens(
      user.result.id,
      user.result.nickname,
      user.result.rolesId,
      user.result.rolesName
    )
    const dtoToken: IDtoToken = {
      userId: user.result.id,
      refreshToken: token.refreshToken,
      ip,
      fingerprint
    }
    const tokenData = await TokenService.saveToken(dtoToken)
    const result = { token, user: user.result }
    return {
      success: true,
      result,
      message: `Пользователь ${nickname} успешно вошёл и ` + tokenData.message
    }
  }

  async logout (refreshToken: string): Promise<IMessage> {
    const result = await TokenService.removeToken(refreshToken)
    return {
      ...result, message: result.message + ' и вы разлогинились'
    }
  }

  async activate (activateLink: string): Promise<IMessage> {
    const user = await UsersModel.query()
      .findOne({ activateLink })
    if (!user) {
      throw ApiError.badRequest(
        'Ссылка активации не действительная',
        'UsersService activate')
    }
    const result = await UsersModel.query()
      .where({ activateLink })
      .update({ isActivated: true, activateLink: '' })
    return {
      success: true,
      result,
      message: `Пользователь ${user.nickname} успешно активирован!`
    }
  }

  async refresh (
    refreshToken: string, ip: string, fingerprint: string
  ): Promise<IMessage> {
    if (!refreshToken || refreshToken.length < 10) {
      throw ApiError.UnauthorizedError(
        'UsersService refresh')
    }
    const userData = TokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await TokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError(
        'UsersService refresh')
    }

    const user = await this.getUserById(userData.id)
    const token = TokenService.generateTokens(
      user.result.id,
      user.result.nickname,
      user.result.rolesId,
      user.result.rolesName
    )
    const dtoToken: IDtoToken = {
      userId: user.result.id,
      refreshToken: token.refreshToken,
      ip,
      fingerprint
    }
    const tokenData = await TokenService.saveToken(dtoToken)
    const result = { token, user: user.result }
    return {
      success: true,
      result,
      message: `Пользователь ${user.result.nickname} ` + tokenData.message
    }
  }

  async getUserByNickname (nickname: string): Promise<IMessage> {
    const result = await UsersModel.query()
      .findOne('users.nickname', '=', nickname)
      .innerJoin('roles',
        'users.rolesId', '=',
        'roles.id')
      .select('users.*',
        'roles.nameEng as rolesName')
    if (!result) {
      throw ApiError.badRequest(
        `Пользователь с ником ${nickname} не найден`,
        'UsersService getUserByNickname')
    }
    return {
      success: true,
      result,
      message: 'Пользователь получен'
    }
  }

  async deleteUserById (id: number): Promise<IMessage> {
    // const PayLoad = { id }
    // await userQueueDB.add('deleteUser', PayLoad, {
    //   delay: milliseconds.seconds(15)
    // })
    const result = await UsersModel.query()
      .deleteById(id)
    if (!result) {
      throw ApiError.badRequest(
        `Ошибка удаления пользователя с id${id}`,
        'UsersService deleteUserById')
    }
    return {
      success: true,
      message: `Пользователь с ID ${id} удалён!`
    }
  }

  async updateUserById (
    id: number,
    bodyDto: IUsers,
    rolesIdAuthUser: number,
    DtoFile: IUsersFilesArray
  ): Promise<IMessage> {
    const {
      nickname, fullName, email,
      password, city, address, deliveryAddress,
      phoneNumber, delAvatar, isSubscribeToNews
    } = bodyDto
    let rolesId
    if (rolesIdAuthUser === 1) {
      // если авторизированный админ то можно сменить группу
      ({ rolesId } = bodyDto)
    } else {
      rolesId = 3
    }
    const user = await UsersModel.query()
      .findOne({ id })
      .select('id', 'avatar')
    if (!user) {
      throw ApiError.badRequest(
        `Пользователя с ID ${id} не найдено!`,
        'UsersService updateUserById')
    }
    const changeUser = await UsersModel.query()
      .where('id', '=', id)
      .update({
        nickname,
        email,
        fullName,
        password,
        city,
        address,
        deliveryAddress,
        phoneNumber,
        rolesId,
        isSubscribeToNews
      })
    const avatarInfo =
      await this.updAvatar(user.id, DtoFile, delAvatar, user)
    return {
      success: true,
      result: changeUser,
      message: `Данные пользователя с ID${id} изменены; ${avatarInfo}`
    }
  }

  async getUserById (id: number): Promise<IMessage> {
    // let user
    // user = await cacheRedisDB.get('user:' + id)
    // if (user) {
    //   user = JSON.parse(user)
    // } else {
    const user = await UsersModel.query()
      .findOne('users.id', '=', id)
      .innerJoin('roles',
        'users.rolesId', '=',
        'roles.id')
      .select('users.*', 'roles.nameEng as rolesName')
    if (!user) {
      throw ApiError.badRequest(
        `Пользователя с ID ${id} не найдено!`,
        'UsersService getUserById')
    }
    // await cacheRedisDB.set('user:' + id, JSON.stringify(user))
    // }
    // await cacheRedisDB.expire('user:' + id, 1800) // удалять через пол часа
    return {
      success: true,
      result: user,
      message: `Пользователь с ID ${id} загружен!`
    }
  }

  async getUsers (
    limit: number = 10, page: number = 1
  ): Promise<IMessage> {
    const result = await UsersModel.query()
      .page(page - 1, limit)
    if (!result) {
      throw ApiError.badRequest(
        `Пользователей на странице ${page} не найдено`,
        'UsersService getUsers')
    }
    return {
      success: true,
      result,
      message: `Страница ${page} пользователей успешно загружена`
    }
  }

  async searchUsers (
    nickname: string = '', limit: number = 10, page: number = 1
  ): Promise<IMessage> {
    const users = await UsersModel.query()
      .page(page - 1, limit)
      .where('nickname', 'like', `%${nickname}%`)
    if (!users) {
      return {
        success: false,
        message: `Поиск ничего не нашёл по никнейму ${nickname}`
      }
    }
    return {
      success: true,
      result: users,
      message: 'Поиск прошёл успешно'
    }
  }
}

export default UsersService.getInstance()
