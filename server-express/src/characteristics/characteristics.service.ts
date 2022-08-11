import { IMessage } from '@/interface'
import CharacteristicsSetValueModel from './characteristicsSetValue.model'
import CharacteristicsNameModel from './characteristicsName.model'
import ApiError from '@/apiError'
import {
  ICharacteristic,
  ICharacteristicName, ICharacteristicProduct,
  ICharacteristicService, ICharacteristicSetValue
} from './characteristics.interface'
import { QueryBuilder } from 'objection'
import CharacteristicsValuesModel from '@/characteristics/characteristicsValues.model'

class CharacteristicsService implements ICharacteristicService {
  private static instance = new CharacteristicsService()

  static getInstance (): CharacteristicsService {
    if (!CharacteristicsService.instance) {
      CharacteristicsService.instance = new CharacteristicsService()
    }
    return CharacteristicsService.instance
  }

  async addCharacteristicValueProduct (
    Dto: ICharacteristicSetValue): Promise<IMessage> {
    const { productId, characteristicsNameId, value } = Dto
    if (!productId) {
      throw ApiError.badRequest(
        'Не выбран id продукта',
        'CharacteristicsService addCharacteristicProduct')
    }
    let haveValue = await CharacteristicsValuesModel.query()
      .findOne({ value })
      .select('*')
    if (!haveValue) {
      haveValue = await CharacteristicsValuesModel.query()
        .insert({ value })
        .select('*')
    }
    const haveProductValue =
      await CharacteristicsSetValueModel.query()
        .findOne({
          productId,
          characteristicsValueId: haveValue.id
        })

    if (haveProductValue) {
      throw ApiError.badRequest(
        `Характеристика '${value}' у продукта` +
        ` c id${productId} уже есть`,
        'CharacteristicsService addCharacteristicProduct')
    }

    const result = await CharacteristicsSetValueModel.query()
      .insert({
        productId: +productId,
        characteristicsNameId: +characteristicsNameId,
        characteristicsValueId: haveValue.id
      })
      .select('*')
    if (!result) {
      throw ApiError.badRequest(
        'Характеристика к продукту не добавлена',
        'CharacteristicsService addCharacteristicProduct')
    }
    return {
      success: true,
      result: { ...result, characteristicsValue: value },
      message: `Характеристика ${value} для продукта с id${productId} загружена`
    }
  }

  async updCharacteristicValueProduct (id: number, Dto: ICharacteristicSetValue): Promise<IMessage> {
    const { productId, characteristicsNameId, value } = Dto
    if (!productId) {
      throw ApiError.badRequest(
        'Не выбран id продукта',
        'CharacteristicsService updCharacteristicProduct')
    }
    let haveValue = await CharacteristicsValuesModel.query()
      .findOne({ value })
      .select('*')
    if (!haveValue) {
      haveValue = await CharacteristicsValuesModel.query()
        .insert({ value })
        .select('*')
    }
    const result = await CharacteristicsSetValueModel.query()
      .where({ id })
      .update({
        productId: +productId,
        characteristicsNameId: +characteristicsNameId,
        characteristicsValueId: haveValue.id
      })
    if (!result) {
      throw ApiError.badRequest(
        'Характеристики к продукту не изменены',
        'CharacteristicsService updCharacteristicProduct')
    }
    return {
      success: true,
      result: { productId, characteristicsNameId, value },
      message: `Характеристика ${id} для продукта с id${productId} изменена`
    }
  }

  async delCharacteristicValueProduct (id: number): Promise<IMessage> {
    const setValue = await CharacteristicsSetValueModel.query()
      .findById(id)
      .select('characteristicsValueId', 'productId')
    if (!setValue) {
      throw ApiError.badRequest(
        `Характеристики с id${id} к продукту нет`,
        'CharacteristicsService delCharacteristicProduct')
    }
    const result = await CharacteristicsSetValueModel.query()
      .deleteById(id)
    const haveValueInProducts =
      await CharacteristicsValuesModel.query()
        .findById(setValue.characteristicsValueId)
        .joinRelated('characteristicsSetValue')
        .select('characteristicsSetValue.id',
          'characteristicsSetValue.productId')
    if (!haveValueInProducts) {
      // если нет характеристики ни в каком продукте то удаляем
      await CharacteristicsValuesModel.query()
        .deleteById(setValue.characteristicsValueId)
    }
    if (!result) {
      throw ApiError.badRequest(
        'Характеристика к продукту не удалена',
        'CharacteristicsService delCharacteristicProduct')
    }
    return {
      success: true,
      result,
      message: `Характеристика ${id} к продукту c id${setValue.productId} удалена`
    }
  }

  async getAllCharacteristicsNameByCategoryId (categoryId: number) {
    const characteristics = await CharacteristicsNameModel.query()
      .where('characteristicsName.categoryId', '=', categoryId)
      .leftJoinRelated('parent')
      .select('characteristicsName.parentId',
        'characteristicsName.id as propertyNameId',
        'characteristicsName.name as propertyName',
        'parent.name as sectionName',
        'parent.id as sectionId')
      .groupBy('characteristicsName.parentId',
        'characteristicsName.id')
    if (characteristics.length === 0) {
      return {
        success: true,
        message: 'Характеристик ' +
          `для категории с id${categoryId} нет`
      }
    }
    const section = this.sortCharacteristicsTree(characteristics)
    return {
      success: true,
      result: section,
      message: 'Характеристики ' +
        `для категории с id${categoryId} загружены`
    }
  }

  /* ToDo: сделать функцию для выгрузки всех характеристик и значений с возможностью выбора categoryId
   *   в древовидном виде чтобы добавить их в панель фильтра
   *     и подсчитать для каждой количество материалов с каждой характеристикой
   */
  async getAllCharacteristics ({ categoryId = 0 }: { categoryId: number }): Promise<IMessage> {
    let characteristics
    if (categoryId > 0) {
      characteristics = await this.getCharacteristicValue()
        .where('characteristicsName.categoryId', '=', categoryId)
    } else {
      characteristics = await this.getCharacteristicValue()
    }

    if (characteristics.length === 0) {
      return {
        success: true,
        message: 'Характеристик ' +
          (categoryId > 0
            ? `для категории с id${categoryId} `
            : '') +
          'нет'
      }
    }
    const section = this.sortCharacteristicsTree(characteristics)
    return {
      success: true,
      result: section,
      message: 'Характеристики ' +
        (categoryId > 0
          ? `для категории с id${categoryId} `
          : '') +
        'загружены'
    }
  }

  getCharacteristicName = (): QueryBuilder<CharacteristicsNameModel, CharacteristicsNameModel[]> => {
    return CharacteristicsNameModel.query()
      .leftOuterJoinRelated('characteristicsValue')
      .joinRelated('parent')
      .select('characteristicsName.parentId',
        'characteristicsName.id as propertyNameId',
        'characteristicsName.name as propertyName',
        'characteristicsValue.id as propertyValueId',
        'characteristicsValue.value as propertyValue',
        'parent.name as sectionName',
        'parent.id as sectionId')
      .groupBy('characteristicsName.parentId',
        'characteristicsName.id',
        'characteristicsValue.id')
  }

  getCharacteristicValue = (): QueryBuilder<CharacteristicsSetValueModel, CharacteristicsSetValueModel[]> => {
    return CharacteristicsSetValueModel.query()
      .leftOuterJoinRelated('characteristicsName')
      .leftOuterJoinRelated('characteristicsName.parent')
      .leftJoinRelated('characteristicsValues')
      .select('characteristicsName.parentId',
        'characteristicsName.id as propertyNameId',
        'characteristicsName.name as propertyName',
        'characteristicsSetValue.id as propertyValueId',
        'characteristicsValues.value as propertyValue',
        'characteristicsName:parent.name as sectionName',
        'characteristicsName:parent.id as sectionId')
  }

  sortCharacteristicsTree (character: CharacteristicsSetValueModel[] | CharacteristicsNameModel[]): ICharacteristicProduct[] {
    const section: ICharacteristicProduct[] = []
    const characteristics = character as unknown as {
      parentId: number
      propertyNameId: number
      propertyName: string
      propertyValueId: number
      propertyValue: string
      sectionName: string
      sectionId: number
    }[]
    characteristics.forEach((all) => {
      const ids = new Set(section.map(section => section.sectionId))
      const charListNameId: number[] = []
      if (!ids.has(all.sectionId)) {
        section.push({
          sectionName: all.sectionName,
          sectionId: all.sectionId,
          characteristics: characteristics
            .filter((charName: { sectionId: number }) =>
              charName.sectionId === all.sectionId)
            .map((
              charName: { propertyNameId: number, propertyName: string }
            ) => ({
              characteristicNameId: charName.propertyNameId,
              characteristicName: charName.propertyName,
              values: characteristics
                .filter((
                  charValue: { propertyNameId: number }) =>
                  charValue.propertyNameId === charName.propertyNameId)
                .map(
                  (charValue: { propertyValueId: number, propertyValue: string }
                  ) => ({
                    characteristicValueId: charValue.propertyValueId,
                    characteristicValue: charValue.propertyValue
                  }))
            }))
            .filter((value: { characteristicNameId: number }) => {
              // удаляем повторные названия характеристик
              if (!charListNameId.includes(value.characteristicNameId)) {
                charListNameId.push(value.characteristicNameId)
                return true
              } else {
                return false
              }
            })
            .map((value: ICharacteristic) => {
              // если ничего нет у values удаляем
              if (value.values && value.values[0].characteristicValueId) {
                return value
              } else {
                return {
                  characteristicNameId: value.characteristicNameId,
                  characteristicName: value.characteristicName
                }
              }
            })
        })
      }
    })
    return section
  }

  async getCharacteristicValueProductById (id: number): Promise<IMessage> {
    const characteristics = await this.getCharacteristicValue()
      .where('characteristicsSetValue.productId', '=', id)
    if (characteristics.length === 0) {
      return {
        success: true,
        message: `Характеристик для продукта с id${id} нет`
      }
    }

    const section = this.sortCharacteristicsTree(characteristics)

    return {
      success: true,
      result: section,
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
          'CharacteristicsService addCharacteristicName')
      }
    }
    const result = await CharacteristicsNameModel.query()
      .insert({
        name,
        categoryId: +categoryId,
        fieldType,
        parentId
      })
      .select('*')
    if (!result) {
      throw ApiError.badRequest(
        `Характеристика '${name}' не добавлена`,
        'ProductsPriceService addCharacteristicName')
    }
    return {
      success: true,
      result,
      message: `Характеристика '${name}' добавлена`
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
          'CharacteristicsService updCharacteristicName')
      }
    }
    const result = await CharacteristicsNameModel.query()
      .where({ id })
      .update({
        name,
        categoryId: +categoryId,
        fieldType,
        parentId
      })
    if (!result) {
      throw ApiError.badRequest(
        `Характеристика ${name} не изменена`,
        'CharacteristicsService updCharacteristicName')
    }
    return {
      success: true,
      result: { name, fieldType, categoryId, parentId },
      message: `Характеристика ${name} изменена`
    }
  }

  async delCharacteristicName (id: number): Promise<IMessage> {
    const result = await CharacteristicsNameModel.query()
      .deleteById(id)
    if (!result) {
      throw ApiError.badRequest(
        'Характеристику не удалось удалить',
        'CharacteristicsService delCharacteristicName')
    }
    return {
      success: true,
      result,
      message: `Характеристика с id${id} успешно удалена`
    }
  }
}

export default CharacteristicsService.getInstance()
