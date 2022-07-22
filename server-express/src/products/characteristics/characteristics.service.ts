import { IMessage } from '@/interface'
import CharacteristicsSetValueModel from './characteristicsSetValue.model'
import CharacteristicsNameModel from './characteristicsName.model'
import ApiError from '@/apiError'
import {
  ICharacteristicName,
  ICharacteristicService, ICharacteristicSetValue
} from '@/products/characteristics/characteristics.interface'

class CharacteristicsService implements ICharacteristicService {
  private static instance = new CharacteristicsService()

  static getInstance (): CharacteristicsService {
    if (!CharacteristicsService.instance) {
      CharacteristicsService.instance = new CharacteristicsService()
    }
    return CharacteristicsService.instance
  }

  async addCharacteristicValueProduct (Dto: ICharacteristicSetValue): Promise<IMessage> {
    const { productId, characteristicsNameId, value } = Dto
    if (!productId) {
      throw ApiError.badRequest(
        'Не выбран id продукта',
        'CharacteristicsService addCharacteristicProduct')
    }
    const result = await CharacteristicsSetValueModel.query()
      .insert({
        product_id: +productId,
        characteristics_name_id: +characteristicsNameId,
        value
      })
    if (!result) {
      throw ApiError.badRequest(
        'Характеристики к продукту не добавлены',
        'CharacteristicsService addCharacteristicProduct')
    }
    return {
      success: true,
      result,
      message: `Характеристика ${value} для продукта с id${productId} загружена`
    }
  }

  async updCharacteristicValueProduct (id: number, Dto: ICharacteristicSetValue): Promise<IMessage> {
    const { productId, characteristicsNameId, value } = Dto
    if (!id || !productId) {
      throw ApiError.badRequest(
        'Не выбран id характеристики или продукта',
        'CharacteristicsService updCharacteristicProduct')
    }
    const result = await CharacteristicsSetValueModel.query()
      .where({ id })
      .update({
        product_id: +productId,
        characteristics_name_id: +characteristicsNameId,
        value
      })
    if (!result) {
      throw ApiError.badRequest(
        'Характеристики к продукту не изменены',
        'CharacteristicsService updCharacteristicProduct')
    }
    return {
      success: true,
      result,
      message: `Характеристика ${id} для продукта с id${productId} изменена`
    }
  }

  async delCharacteristicValueProduct (id: number): Promise<IMessage> {
    const result = await CharacteristicsSetValueModel.query()
      .deleteById(id)
    if (!result) {
      throw ApiError.badRequest(
        'Характеристика к продукту не удалена',
        'CharacteristicsService delCharacteristicProduct')
    }
    return {
      success: true,
      result,
      message: `Характеристика ${id} удалена`
    }
  }

  async getCharacteristicValueProductById (id: number): Promise<IMessage> {
    const result = await CharacteristicsSetValueModel.query()
      .where('characteristics_set_value.product_id', '=', id)
      .innerJoin('characteristics_name',
        'characteristics_set_value.characteristics_name_id', '=',
        'characteristics_name.id')
      .innerJoin('characteristics_name as parent',
        'characteristics_name.parent_id', '=',
        'parent.id')
      .select('characteristics_name.id',
        'characteristics_name.parent_id',
        'characteristics_name.name as propertyName',
        'characteristics_set_value.value as propertyValue',
        'parent.name as sectionName')

    if (!result) {
      throw ApiError.badRequest(
        'Характеристик не найдено',
        'CharacteristicsService getCharacteristicProductById')
    }
    return {
      success: true,
      result,
      message: `Характеристики для продукта с id${id} загружены`
    }
  }

  async addCharacteristicName (Dto: ICharacteristicName): Promise<IMessage> {
    const { name, categoryId, fieldType, parentId } = Dto
    if (parentId && parentId > 0) {
      const parent = await CharacteristicsNameModel.query()
        .findOne({ id: parentId })
        .select('name')
      if (parent) {
        throw ApiError.badRequest(
          `Родительской характеристики с id${parentId} не существует`,
          'CharacteristicsService addCharacteristicValue')
      }
    }
    const result = await CharacteristicsNameModel.query()
      .insert({
        name,
        category_id: +categoryId,
        field_type: fieldType,
        parent_id: parentId
      })
      .select('*')
    if (!result) {
      throw ApiError.badRequest(
        `Характеристика ${name} не добавлена`,
        'ProductsPriceService createProductPrice')
    }
    return {
      success: true,
      result,
      message: `Характеристика ${name} добавлена`
    }
  }

  async updCharacteristicName (id: number, Dto: ICharacteristicName): Promise<IMessage> {
    const { name, fieldType, categoryId, parentId } = Dto
    if (parentId && parentId > 0) {
      const parent = await CharacteristicsNameModel.query()
        .findOne({ id: parentId })
        .select('name')
      if (parent) {
        throw ApiError.badRequest(
          `Родительской характеристики с id${parentId} не существует`,
          'CharacteristicsService updCharacteristicValue')
      }
    }
    const result = await CharacteristicsNameModel.query()
      .where({ id })
      .update({
        name,
        category_id: +categoryId,
        field_type: fieldType,
        parent_id: parentId
      })
    if (!result) {
      throw ApiError.badRequest(
        `Характеристика ${name} не изменена`,
        'CharacteristicsService updCharacteristicValue')
    }
    return {
      success: true,
      result,
      message: `Характеристика ${name} изменена`
    }
  }

  async delCharacteristicName (id: number): Promise<IMessage> {
    const result = await CharacteristicsNameModel.query()
      .deleteById(id)
    if (!result) {
      throw ApiError.badRequest(
        'Характеристику не удалось удалить',
        'CharacteristicsService delCharacteristicValue')
    }
    return {
      success: true,
      result,
      message: `Характеристика с id${id} успешно удалена`
    }
  }
}

export default CharacteristicsService.getInstance()
