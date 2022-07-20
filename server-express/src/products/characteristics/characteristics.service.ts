import { IMessage } from '@/interface'
import CharacteristicsSetsModel from './characteristicsSets.model'
import CharacteristicsValuesModel from './characteristicsValues.model'
import ApiError from '@/apiError'
import {
  ICharacteristicService, ICharacteristicSet, ICharacteristicValue
} from '@/products/characteristics/characteristics.interface'

class CharacteristicsService implements ICharacteristicService {
  private static instance = new CharacteristicsService()

  static getInstance (): CharacteristicsService {
    if (!CharacteristicsService.instance) {
      CharacteristicsService.instance = new CharacteristicsService()
    }
    return CharacteristicsService.instance
  }

  async addCharacteristicProduct (Dto: ICharacteristicSet): Promise<IMessage> {
    const { productId, characteristicsValuesId, value } = Dto
    if (!productId) {
      throw ApiError.badRequest(
        'Не выбран id продукта',
        'CharacteristicsService addCharacteristicProduct')
    }
    const result = await CharacteristicsSetsModel.query()
      .insert({
        product_id: productId,
        characteristics_values_id: characteristicsValuesId,
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

  async updCharacteristicProduct (id: number, Dto: ICharacteristicSet): Promise<IMessage> {
    const { productId, characteristicsValuesId, value } = Dto
    if (!id || !productId) {
      throw ApiError.badRequest(
        'Не выбран id характеристики или продукта',
        'CharacteristicsService updCharacteristicProduct')
    }
    const result = await CharacteristicsSetsModel.query()
      .where({ id })
      .update({
        product_id: productId,
        characteristics_values_id: characteristicsValuesId,
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

  async delCharacteristicProduct (id: number): Promise<IMessage> {
    const result = await CharacteristicsSetsModel.query()
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

  async getCharacteristicProductById (id: number): Promise<IMessage> {
    const result = await CharacteristicsSetsModel.query()
      .where('characteristics_sets.product_id', '=', id)
      .innerJoin('characteristics_values',
        'characteristics_sets.characteristics_values_id', '=',
        'characteristics_values.id')
      .innerJoin('characteristics_values',
        'characteristics_values.parent_id', '=',
        'characteristics_values.id')
      .select('characteristics_values.name as property_name',
        'characteristics_sets.value as property_value')

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

  async addCharacteristicValue (Dto: ICharacteristicValue): Promise<IMessage> {
    const { name, categoryId, fieldType, parentId } = Dto
    if (parentId && parentId > 0) {
      const parent = await CharacteristicsValuesModel.query()
        .findOne({ id: parentId })
        .select('name')
      if (parent) {
        throw ApiError.badRequest(
          `Родительской характеристики с id${parentId} не существует`,
          'CharacteristicsService addCharacteristicValue')
      }
    }
    const result = await CharacteristicsValuesModel.query()
      .insert({
        name,
        category_id: categoryId,
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

  async updCharacteristicValue (id: number, Dto: ICharacteristicValue): Promise<IMessage> {
    const { name, fieldType, categoryId, parentId } = Dto
    if (parentId && parentId > 0) {
      const parent = await CharacteristicsValuesModel.query()
        .findOne({ id: parentId })
        .select('name')
      if (parent) {
        throw ApiError.badRequest(
          `Родительской характеристики с id${parentId} не существует`,
          'CharacteristicsService updCharacteristicValue')
      }
    }
    const result = await CharacteristicsValuesModel.query()
      .where({ id })
      .update({
        name,
        category_id: categoryId,
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

  async delCharacteristicValue (id: number): Promise<IMessage> {
    const result = await CharacteristicsValuesModel.query()
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
