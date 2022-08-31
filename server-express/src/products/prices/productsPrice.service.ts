import { IMessage } from '@/interface'
import ProductsPriceModel from './productsPrice.model'
import ProductsPriceTypeModel from './productsPriceType.model'
import ApiError from '@/apiError'
import { IProductPrice, IProductPriceService } from './productsPrice.interface'
import ProductsModel from '@/products/products.model'

class ProductsPriceService implements IProductPriceService {
  private static instance = new ProductsPriceService()

  static getInstance (): ProductsPriceService {
    if (!ProductsPriceService.instance) {
      ProductsPriceService.instance = new ProductsPriceService()
    }
    return ProductsPriceService.instance
  }

  async addTypePrice (name: string): Promise<IMessage> {
    const findType = await ProductsPriceTypeModel.query()
      .findOne({ name })
      .select('*')
    if (findType) {
      throw ApiError.badRequest(
        `Тип цены '${name}' уже существует`,
        'ProductsPriceService addTypePrice')
    }
    const result = await ProductsPriceTypeModel.query()
      .insert({ name })
      .select('*')
    if (!result) {
      throw ApiError.badRequest(
        `Тип цены ${name} не добавлен, ` +
        'возможно уже существует',
        'ProductsPriceService addTypePrice')
    }
    return {
      success: true,
      result,
      message: `Тип цены ${name} успешно добавлен`
    }
  }

  async delTypePrice (id: number): Promise<IMessage> {
    const result = await ProductsPriceTypeModel.query()
      .deleteById(id)
    if (!result) {
      throw ApiError.badRequest(
        `Тип цены с id${id} не удалось удалить`,
        'ProductsPriceService delTypePrice')
    }
    return {
      success: true,
      result,
      message: `Тип цены с id${id} успешно удалён`
    }
  }

  async updateTypePrice (
    id: number, name: string): Promise<IMessage> {
    const result = await ProductsPriceTypeModel.query()
      .where({ id })
      .update({ name })
    if (!result) {
      throw ApiError.badRequest(
        `Тип цены с id${id} не удалось изменить`,
        'ProductsPriceService updateTypePrice')
    }
    return {
      success: true,
      result: { id, name },
      message: `Тип цены с id${id} успешно изменен`
    }
  }

  async getTypePriceById (id: number): Promise<IMessage> {
    const result = await ProductsPriceTypeModel.query()
      .findById(id)
      .select('*')
    if (!result) {
      throw ApiError.badRequest(
        `Типа цены с id${id} не существует`,
        'ProductsPriceService getTypePriceById')
    }
    return {
      success: true,
      result,
      message: `Тип цены с id${id} получен`
    }
  }

  async getTypesPrices (
    limit: number = 20, page: number = 1
  ): Promise<IMessage> {
    const result = await ProductsPriceTypeModel.query()
      .page(page - 1, limit)
      .select('*')
    if (!result) {
      throw ApiError.badRequest(
        `Тип цен на странице ${page} не найдено`,
        'ProductsPriceService getTypesPrices')
    }
    const total = result.total
    const totalPage = Math.ceil((total || limit) / limit)
    return {
      success: true,
      result: { ...result, page, limit, totalPage },
      message: `Страница ${page} тип цен успешно загружена`
    }
  }

  async getProductPriceByTypesPricesId (
    typePriceId: number, productId: number
  ): Promise<IMessage> {
    const result = await ProductsPriceModel.query()
      .findOne({ priceTypeId: typePriceId, productId })
      .select('*')
    if (!result) {
      return {
        success: false,
        message: `Нет цены для продукта с id${productId}`
      }
    }
    return {
      success: true,
      result,
      message: `Цена для продукта с id${productId
      } успешно получена`
    }
  }

  async getAllPriceByProductId (
    productId: number): Promise<IMessage> {
    const result = await ProductsPriceModel.query()
      .where({ productId })
      .joinRelated('priceType')
      .select('productsPrice.*',
        'priceType.name as typeName')
    if (!result) {
      throw ApiError.badRequest(
        `Нет цен для продукта с id${productId}`,
        'ProductsPriceService getAllPriceByProductId')
    }
    return {
      success: true,
      result,
      message: `Все цены для продукта с id${productId
      } успешно получены`
    }
  }

  async addPriceForProduct (
    Dto: IProductPrice): Promise<IMessage> {
    const { priceTypeId, productId, price, currency } = Dto
    const alreadyHave = await ProductsPriceModel.query()
      .where({
        'productsPrice.priceTypeId': +priceTypeId,
        'productsPrice.productId': +productId
      })
      .first()
      .joinRelated('priceType')
      .select('productsPrice.price',
        'productsPrice.currency',
        'productsPrice.priceTypeId',
        'productsPrice.id',
        'priceType.name as priceType')
    if (alreadyHave) {
      throw ApiError.badRequest(
        `Цена для продукта с id${productId}` +
        ` типа '${alreadyHave.priceType}' уже есть,` +
        ` вы можете изменить цену по id${alreadyHave.id}`,
        'ProductsPriceService addPriceForProduct')
    }
    const typePrice = await this.getTypePriceById(priceTypeId)
    if (!typePrice.result) {
      throw ApiError.badRequest(
        `Тип цены с id${priceTypeId} не существует`,
        'ProductsPriceService updProductPrice')
    }
    const product =
      await ProductsModel.query().findById(productId)
    if (!product) {
      throw ApiError.badRequest(
        `Продукта с id${productId} не существует`,
        'ProductsPriceService updProductPrice')
    }
    const result = await ProductsPriceModel.query()
      .insert({
        priceTypeId: +priceTypeId,
        productId: +productId,
        price,
        currency: currency || '₴'
      })
      .select('*')
    if (!result) {
      throw ApiError.badRequest(
        `Новая цена для продукта с id${productId}` +
        ' не добавлена',
        'ProductsPriceService addPriceForProduct')
    }
    return {
      success: true,
      result,
      message: `Новая цена для продукта с id${productId} добавлена`
    }
  }

  async updProductPrice (
    id: number, Dto: IProductPrice): Promise<IMessage> {
    const { priceTypeId, productId, price, currency } = Dto
    const typePrice = await this.getTypePriceById(priceTypeId)
    if (!typePrice.result) {
      throw ApiError.badRequest(
        `Тип цены с id${priceTypeId} не существует`,
        'ProductsPriceService updProductPrice')
    }
    const product =
      await ProductsModel.query().findById(productId)
    if (!product) {
      throw ApiError.badRequest(
        `Продукта с id${productId} не существует`,
        'ProductsPriceService updProductPrice')
    }
    const result = await ProductsPriceModel.query()
      .where({ id })
      .update({
        priceTypeId,
        productId,
        price,
        currency: currency || '₴'
      })
      .select('currency')
    if (!result) {
      throw ApiError.badRequest(
        `Ошибка изменения цены с id ${id}`,
        'ProductsPriceService updProductPrice')
    }
    return {
      success: true,
      result: {
        priceTypeId,
        productId,
        price,
        currency: currency || '₴'
      },
      message: `Цена (${price}${currency || '₴'}) ` +
        `с id${id} для продукта '${product.title}' ` +
        `и типа '${typePrice.result.name}' успешно изменена`
    }
  }

  async delProductPrice (id: number): Promise<IMessage> {
    const result = await ProductsPriceModel.query()
      .deleteById(id)
    if (!result) {
      throw ApiError.badRequest(
        `Ошибка удаления цены с id${id},` +
        'возможно нету цены с таким id',
        'ProductsPriceService delProductPrice')
    }
    return {
      success: true,
      result,
      message: `Цена с id${id} успешно удалена`
    }
  }
}

export default ProductsPriceService.getInstance()
