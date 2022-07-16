import { IRoles, IRolesService } from './roles.interface'
import { IMessage } from '../../interface'
import RolesModel from './roles.model'
import ApiError from '../../apiError'

class RolesService implements IRolesService {
  private static instance = new RolesService()

  static getInstance (): RolesService { // singleton
    if (!RolesService.instance) {
      RolesService.instance = new RolesService()
    }
    return RolesService.instance
  }

  async AddRole (Dto: IRoles): Promise<IMessage> {
    const { name, nameEng } = Dto
    const result = await RolesModel.query()
      .insert({
        name,
        name_eng: nameEng
      })
    if (!result) {
      throw ApiError.badRequest(
        'Ошибка создания роли',
        'RolesDao AddRole')
    }
    return {
      success: true,
      result,
      message: `Группа пользователей ${nameEng} успешно добавлена!`
    }
  }

  async getRoleById (id: number): Promise<IMessage> {
    const result = await RolesModel.query()
      .findOne({ id })
    if (!result) {
      throw ApiError.badRequest(
        'Ошибка создания роли',
        'RolesDao getRoleById')
    }
    return {
      success: true,
      result,
      message: `Группа по ID ${id} получена`
    }
  }

  async getRoles (): Promise<IMessage> {
    const result = await RolesModel.query()
    if (!result) {
      throw ApiError.badRequest(
        'Ошибка получения ролей',
        'RolesDao getRoles')
    }
    return {
      success: true,
      result,
      message: 'Все Группы полученны'
    }
  }
}

export default RolesService.getInstance()
