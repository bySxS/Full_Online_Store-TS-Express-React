import { IMessage } from '@/interface'
import ProductsPriceModel from './productsPrice.model'
import ProductsPriceTypeModel from './productsPriceType.model'
import ApiError from '@/apiError'
import { IProductPrice, IProductPriceService } from './productsPrice.interface'

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
      .select('name')
    if (findType) {
      throw ApiError.badRequest(
        `Тип цены '${name}' уже существует`,
        'ProductsPriceService addTypePrice')
    }
    const result = await ProductsPriceTypeModel.query()
      .insert({ name })
      .select('name')
    if (!result) {
      throw ApiError.badRequest(
        `Тип цены ${name} не добавлен, возможно уже существует`,
        'ProductsPriceService createProductPrice')
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

  async updateTypePrice (id: number, name: string): Promise<IMessage> {
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
      result: { name },
      message: `Тип цены с id${id} успешно изменен`
    }
  }

  async getTypePriceById (id: number): Promise<IMessage> {
    const result = await ProductsPriceTypeModel.query()
      .findById(id)
      .select('*')
    if (!result) {
      throw ApiError.badRequest(
        `Типа цены с id ${id} не существует`,
        'ProductsPriceService getTypePriceById')
    }
    return {
      success: true,
      result,
      message: `Тип цены с id ${id} получен`
    }
  }

  async getTypesPrices (limit: number = 20, page: number = 1): Promise<IMessage> {
    const result = await ProductsPriceTypeModel.query()
      .page(page - 1, limit)
    if (!result) {
      throw ApiError.badRequest(
        `Тип цен на странице ${page} не найдено`,
        'ProductsPriceService getTypesPrices')
    }
    return {
      success: true,
      result,
      message: `Страница ${page} тип цен успешно загружена`
    }
  }

  async getProductPriceByTypesPricesId (typePriceId: number, productId: number): Promise<IMessage> {
    const result = await ProductsPriceModel.query()
      .findOne({ price_type_id: typePriceId, product_id: productId })
      .select('*')
    if (!result) {
      throw ApiError.badRequest(
        `Нет цены для продукта с id${productId}`,
        'ProductsPriceService getProductPriceByTypesPricesId')
    }
    return {
      success: true,
      result,
      message: `Цена для продукта с id${productId} успешно получена`
    }
  }

  async updateProductPrice (Dto: IProductPrice): Promise<IMessage> {
    const { id, priceTypeId, productId, price, currency } = Dto
    const result = await ProductsPriceModel.query()
      .where({ id })
      .update({
        price_type_id: priceTypeId,
        product_id: productId,
        price,
        currency
      })
    if (!result) {
      throw ApiError.badRequest(
        `Ошибка изменения цены для продукта с id ${productId}`,
        'ProductsPriceService changeProductPrice')
    }
    return {
      success: true,
      result,
      message: `Цена для продукта с id ${productId} изменена`
    }
  }

  async createProductPrice (Dto: IProductPrice): Promise<IMessage> {
    const { priceTypeId, productId, price, currency } = Dto
    const result = await ProductsPriceModel.query()
      .insert({
        price_type_id: priceTypeId,
        product_id: productId,
        price,
        currency
      })
      .select('price', 'currency', 'price_type_id')
    if (!result) {
      throw ApiError.badRequest(
        `Поле цены для продукта с id ${productId} не создана`,
        'ProductsPriceService createProductPrice')
    }
    return {
      success: true,
      result,
      message: `Поле цены для продукта с id ${productId} инициализировано`
    }
  }
}

export default ProductsPriceService.getInstance()
