import CategoryService from '@/category/category.service'
import { IMessage } from '@/interface'
import CharacteristicsSetValueModel from './characteristicsSetValue.model'
import CharacteristicsNameModel from './characteristicsName.model'
import ApiError from '@/apiError'
import {
  ICharacteristic,
  ICharacteristicName, ICharacteristicProduct,
  ICharacteristicService, ICharacteristicSetValue, ICharacteristicValueDelete, ICharacteristicValueUpdate
} from './characteristics.interface'
import { QueryBuilder, raw } from 'objection'
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
    if (!productId || !characteristicsNameId) {
      throw ApiError.badRequest(
        'Не выбран id продукта или id названия характеристики',
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

  async updCharacteristicValueProduct (Dto: ICharacteristicValueUpdate): Promise<IMessage> {
    const { productId, characteristicsValueId, value } = Dto
    const setValue = await CharacteristicsSetValueModel.query()
      .where({
        characteristicsValueId,
        productId
      })
      .first()
      .select('*')
    if (!setValue) {
      throw ApiError.badRequest(
        `Характеристики с id${characteristicsValueId} к продукту нет`,
        'CharacteristicsService delCharacteristicProduct')
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
      .findById(setValue.id)
      .update({
        productId: setValue.productId,
        characteristicsNameId: setValue.characteristicsNameId,
        characteristicsValueId: haveValue.id
      })
    if (!result) {
      throw ApiError.badRequest(
        'Характеристики к продукту не изменены',
        'CharacteristicsService updCharacteristicProduct')
    }
    return {
      success: true,
      result: { productId, id: setValue.id, characteristicsValueId, value },
      message: `Характеристика ${setValue.id} для продукта с id${productId} изменена`
    }
  }

  async delCharacteristicValueProduct (Dto: ICharacteristicValueDelete): Promise<IMessage> {
    const { productId, characteristicsValueId } = Dto
    const setValue = await CharacteristicsSetValueModel.query()
      .where({
        characteristicsValueId,
        productId
      })
      .first()
      .select('characteristicsValueId', 'productId', 'id')
    if (!setValue) {
      throw ApiError.badRequest(
        `Характеристики с id${characteristicsValueId} к продукту нет`,
        'CharacteristicsService delCharacteristicProduct')
    }
    const result = await CharacteristicsSetValueModel.query()
      .where({
        characteristicsValueId,
        productId
      })
      .first()
      .delete()
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
      message: `Характеристика ${characteristicsValueId} к продукту c id${productId} удалена`
    }
  }

  async getAllCharacteristicsNameByCategoryId ({ categoryId, sort = true }: { categoryId: number, sort?: boolean }) {
    if (categoryId === 0) {
      return {
        success: true,
        message: 'Характеристик ' +
          `для категории с id${categoryId} нет`
      }
    }
    // const allCategory = await CategoryService
    //   .getAllCategoryBySectionWithCache(categoryId)
    // allCategory.push(categoryId)
    const characteristics = await CharacteristicsNameModel.query()
      .whereIn('characteristicsName.categoryId', [categoryId])
      // .leftOuterJoinRelated('parent')
      .select('characteristicsName.id as propertyNameId',
        'characteristicsName.name as propertyName',
        'characteristicsName.parentId as sectionId',
        // 'parent.name as sectionName',
        'characteristicsName.fieldType as propertyFieldType')
      // .groupBy(// 'characteristicsName.parentId',
      //   'characteristicsName.id')
    if (characteristics.length === 0) {
      return {
        success: true,
        message: 'Характеристик ' +
          `для категории с id${categoryId} нет`
      }
    }
    for (const char of characteristics) {
      if (char.sectionId === null) {
        char.sectionId = char.propertyNameId
        char.propertyNameId = null
        char.sectionName = char.propertyName
        char.propertyName = null
      }
    }
    let result
    if (sort) {
      result = this.sortCharacteristicsTree(characteristics)
    } else {
      result = characteristics
    }
    return {
      success: true,
      result,
      message: 'Характеристики ' +
        `для категории с id${categoryId} загружены`
    }
  }

  async getAllCharacteristics ({ sectionId = 0 }: { sectionId?: number }): Promise<IMessage> {
    let characteristics
    if (sectionId > 0) {
      characteristics = await this.getCharacteristicValue()
        .where('characteristicsName.categoryId', '=', sectionId)
    } else {
      characteristics = await this.getCharacteristicValue()
    }

    if (characteristics.length === 0) {
      return {
        success: true,
        message: 'Характеристик ' +
          (sectionId > 0
            ? `для категории с id${sectionId} `
            : '') +
          'нет'
      }
    }
    const section = this.sortCharacteristicsTree(characteristics)
    return {
      success: true,
      result: section,
      message: 'Характеристики ' +
        (sectionId > 0
          ? `для категории с id${sectionId} `
          : '') +
        'загружены'
    }
  }

  getCharacteristicValue = (): QueryBuilder<CharacteristicsSetValueModel, CharacteristicsSetValueModel[]> => {
    return CharacteristicsSetValueModel.query()
      .leftOuterJoinRelated('characteristicsName')
      .leftOuterJoinRelated('characteristicsName.parent')
      .leftOuterJoinRelated('products')
      .leftJoinRelated('characteristicsValues')
      .select('characteristicsName.id as propertyNameId',
        'characteristicsName.name as propertyName',
        raw('count(DISTINCT products.id) as propertyCountProducts'),
        'characteristicsValues.id as propertyValueId',
        'characteristicsValues.value as propertyValue',
        'characteristicsName.fieldType as propertyFieldType',
        'characteristicsName.parentId as sectionId',
        'characteristicsName:parent.name as sectionName')
      .groupBy('characteristicsName.parentId',
        'characteristicsName.id',
        'characteristicsValues.id')
  }

  sortCharacteristicsTree (character: CharacteristicsSetValueModel[] | CharacteristicsNameModel[]): ICharacteristicProduct[] {
    const section: ICharacteristicProduct[] = []
    const characteristics = character as unknown as {
      propertyNameId: number
      propertyName: string
      propertyCountProducts: number
      propertyValueId: number
      propertyValue: string
      propertyFieldType: string
      sectionName: string
      sectionId: number
    }[]
    for (const all of characteristics) {
      const ids = new Set(section.map(section => section.sectionId))
      const charListNameId: number[] = []
      if (!ids.has(all.sectionId)) {
        section.push({
          sectionName: all.sectionName,
          sectionId: all.sectionId,
          characteristics: characteristics // characteristics
            .filter((charName: { sectionId: number, propertyNameId: number }) =>
              charName.sectionId === all.sectionId && charName.propertyNameId !== null)
            .map((
              charName: {
                propertyNameId: number,
                propertyName: string,
                propertyFieldType: string
              }
            ) => ({
              characteristicNameId: charName.propertyNameId,
              characteristicName: charName.propertyName,
              characteristicsFieldType: charName.propertyFieldType,
              values: characteristics // values
                .filter((
                  charValue: { propertyNameId: number }) =>
                  charValue.propertyNameId === charName.propertyNameId)
                .map(
                  (charValue: {
                    propertyValueId: number,
                    propertyValue: string,
                    propertyCountProducts: number
                  }
                  ) => ({
                    characteristicValueId: charValue.propertyValueId,
                    characteristicValue: charValue.propertyValue,
                    characteristicCountProducts: charValue.propertyCountProducts
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
                  characteristicName: value.characteristicName,
                  characteristicsFieldType: value.characteristicsFieldType
                }
              }
            })
        })
      }
    }
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
      if (!parent) {
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
      if (!parent) {
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
