import { IMessage } from '@/interface'
import ProductsPriceModel from './productsPrice.model'
import ProductsPriceTypeModel from './productsPriceType.model'
import ApiError from '@/apiError'
import { IProductPrice, IProductPriceService } from './productsPrice.interface'
import ProductsService from '@/products/products.service'

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

  async getAllPriceByProductId (productId: number): Promise<IMessage> {
    const result = await ProductsPriceModel.query()
      .where({ product_id: productId })
      .innerJoin('products_price_type',
        'products_price.price_type_id', '=',
        'products_price_type.id')
      .select('products_price.*',
        'products_price_type.name as typeName')
    if (!result) {
      throw ApiError.badRequest(
        `Нет цен для продукта с id${productId}`,
        'ProductsPriceService getAllPriceByProductId')
    }
    return {
      success: true,
      result,
      message: `Все цены для продукта с id${productId} успешно получены`
    }
  }

  async addPriceForProduct (Dto: IProductPrice): Promise<IMessage> {
    const { priceTypeId, productId, price, currency } = Dto
    const alreadyHave = await ProductsPriceModel.query()
      .where({
        'products_price.price_type_id': +priceTypeId,
        'products_price.product_id': +productId
      })
      .first()
      .innerJoin('products_price_type', 'products_price_type.id', '=',
        'products_price.price_type_id')
      .select('products_price.price',
        'products_price.currency',
        'products_price.price_type_id',
        'products_price.id',
        'products_price_type.name as priceType')
    if (alreadyHave) {
      throw ApiError.badRequest(
        `Цена для продукта с id${productId} типа '${alreadyHave.priceType}' уже есть, вы можете изменить цену по id${alreadyHave.id}`,
        'ProductsPriceService addPriceForProduct')
    }
    const result = await ProductsPriceModel.query()
      .insert({
        price_type_id: +priceTypeId,
        product_id: +productId,
        price,
        currency: currency || '₴'
      })
      .select('price', 'currency', 'price_type_id')
    if (!result) {
      throw ApiError.badRequest(
        `Новая цена для продукта с id${productId} не добавлена`,
        'ProductsPriceService addPriceForProduct')
    }
    return {
      success: true,
      result,
      message: `Новая цена для продукта с id${productId} добавлена`
    }
  }

  async updProductPrice (id: number, Dto: IProductPrice): Promise<IMessage> {
    const { priceTypeId, productId, price, currency } = Dto
    const typePrice = await this.getTypePriceById(priceTypeId)
    const product = await ProductsService.getById(productId, false)
    const result = await ProductsPriceModel.query()
      .where({ id })
      .update({
        price_type_id: priceTypeId,
        product_id: productId,
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
      result: { currency: price + (currency || '₴') },
      message: `Цена (${price}${currency || '₴'}) с id${id} для продукта '${product.result.title}' и типа '${typePrice.result.name}' успешно изменена`
    }
  }

  async delProductPrice (id: number): Promise<IMessage> {
    const result = await ProductsPriceModel.query()
      .deleteById(id)
    if (!result) {
      throw ApiError.badRequest(
        `Ошибка удаления цены с id${id}, возможно нету цены с таким id`,
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
