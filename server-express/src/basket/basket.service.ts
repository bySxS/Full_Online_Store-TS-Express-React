import { IBasket, IBasketProduct, IBasketService } from '@/basket/basket.interface'
import { IMessage } from '@/interface'
import ApiError from '@/apiError'
import BasketModel from '@/basket/basket.model'
import BasketProductsModel from '@/basket/basketProducts.model'
import ProductsService from '@/products/products.service'
import { raw } from 'objection'

class BasketService implements IBasketService {
  private static instance = new BasketService()

  static getInstance (): BasketService {
    if (!BasketService.instance) {
      BasketService.instance = new BasketService()
    }
    return BasketService.instance
  }

  async currentBasketToProcessing (Dto: IBasket): Promise<IMessage> {
    const {
      userId, comment,
      deliveryAddress,
      phoneNumber, fullName
    } = Dto
    const currentBasket = await this.getCurrentBasketByUserId(userId)
    if (currentBasket.result.BasketProducts.length === 0) {
      throw ApiError.badRequest(
        'Ваша корзина пуста',
        'BasketService currentBasketToProcessing')
    }
    const basket = await BasketModel.query()
      .where({ id: currentBasket.result.id })
      .update({
        status: 'InProcessing',
        dateProcessing: new Date(Date.now()),
        comment: comment || '',
        fullName,
        phoneNumber,
        deliveryAddress
      })
    if (!basket) {
      throw ApiError.badRequest(
        `Заказ с id${currentBasket.result.id} не удалось отправить на обработку`,
        'BasketService currentBasketToProcessing')
    }
    return {
      success: true,
      result: {
        BasketProducts: currentBasket.result.BasketProducts,
        fullName,
        phoneNumber,
        deliveryAddress,
        comment: (comment || '')
      },
      message: `Заказ с id${currentBasket.result.id} успешно отправлен в обработку, оператор свяжется с вами в ближайшее время`
    }
  }

  async getCurrentBasketByUserId (userId: number): Promise<IMessage> {
    let basket = await BasketModel.query()
      .where('basket.userId', '=', userId)
      .andWhere(
        'basket.status', '=',
        'SelectsTheProduct')
      .first()
      .select('basket.*')
    if (!basket) { // нету корзины свободной придётся создать
      basket = await BasketModel.query()
        .insert({
          userId: +userId,
          status: 'SelectsTheProduct'
        })
        .select('*')
    }
    const productsInBasket = await BasketProductsModel.query()
      .where('basketProducts.basketId', '=', basket.id)
      .andWhere('productsPriceType.id', '=',
        raw('products.priceTypeId'))
      .innerJoin('products',
        'basketProducts.productId', '=',
        'products.id')
      .innerJoin('category',
        'category.id', '=',
        'products.categoryId')
      .innerJoin('productsPriceType',
        'productsPriceType.id', '=',
        'products.priceTypeId')
      .select('basketProducts.*',
        'products.title as productTitle',
        'category.name as productCategory',
        'products.screen as productScreen',
        'productsPriceType.name as productPriceType',
        'products.availability as productAvailability')
    return {
      success: true,
      result: { ...basket, BasketProducts: productsInBasket },
      message: `Текущая корзина для пользователя с id${userId} получена`
    }
  }

  async addProductToBasket (
    userId: number, Dto: IBasketProduct
  ): Promise<IMessage> {
    const {
      productId, productCount
    } = Dto
    const findCurrentBasket = await this.getCurrentBasketByUserId(userId)
    findCurrentBasket.result.BasketProducts.forEach((product: { productId: number }) => {
      if (product.productId === +productId) {
        throw ApiError.badRequest(
          `Продукт с id${productId} уже в корзине, вы можете изменить количество`,
          'BasketService addProductToBasket')
      }
    })
    const product = await ProductsService.getById(productId)
    if (product.result.availability === false) {
      throw ApiError.badRequest(
        `Продукт ${product.result.title} к сожалению закончился(`,
        'BasketService addProductToBasket')
    }
    if (product.result.count < +productCount) {
      throw ApiError.badRequest(
        `Продукта в количестве ${productCount} у нас нет, максимум можете купить ${product.result.count}`,
        'BasketService addProductToBasket')
    }
    const result = await BasketProductsModel.query()
      .insert({
        basketId: findCurrentBasket.result.id,
        productId: +productId,
        productPriceId: product.result.priceId,
        currentPrice: product.result.price,
        productCount: +productCount
      })
    if (!result) {
      throw ApiError.badRequest(
        `Ошибка при добавлении продукта с id${productId} в корзину`,
        'BasketService addProductToBasket')
    }
    return {
      success: true,
      result,
      message: `Продукт с id${productId} успешно добавлен в корзину`
    }
  }

  async delProductFromBasket (
    userId: number, productId: number
  ): Promise<IMessage> {
    const findCurrentBasket = await this.getCurrentBasketByUserId(userId)
    let id
    findCurrentBasket.result.BasketProducts.forEach((product: { id: number, productId: number }) => {
      if (product.productId === +productId) {
        id = product.id
      }
    })
    if (!id) {
      throw ApiError.badRequest(
        `Ошибка удаления из корзины, продукта с id${productId} в корзине нет`,
        'BasketService delProductFromBasket')
    }
    const result = await BasketProductsModel.query()
      .deleteById(id)
    if (!result) {
      throw ApiError.badRequest(
        `Ошибка удаления продукта с id${productId} из корзины`,
        'BasketService delProductFromBasket')
    }
    return {
      success: true,
      result,
      message: `Продукт с id${productId} успешно удалён из корзины`
    }
  }

  async getAllOrdersByUserId (
    userId: number, limit: number = 20, page: number = 1
  ): Promise<IMessage> {
    const result = await BasketModel.query()
      .page(page - 1, limit)
      .where('basket.status', '<>', 'SelectsTheProduct')
      .andWhere('basket.userId', '=', userId)
      .innerJoin('basketProducts',
        'basket.id', '=',
        'basketProducts.basketId')
      .innerJoin('products',
        'products.id', '=',
        'basketProducts.productId')
      .select('basket.*',
        'basketProducts.currentPrice',
        'basketProducts.productCount',
        'products.title')
    if (!result) {
      throw ApiError.badRequest(
        `У пользователя с id${userId} нет заказов`,
        'BasketService getAllOrdersByUserId')
    }
    return {
      success: true,
      result,
      message: `Все заказы для пользователя с id${userId} получены`
    }
  }

  async getAllOrdersInProgressAllUsers (limit: number, page: number): Promise<IMessage> {
    const result = await BasketModel.query()
      .page(page - 1, limit)
      .where({ 'basket.status': 'InProcessing' })
      .innerJoin('basketProducts',
        'basket.id', '=',
        'basketProducts.basketId')
      .innerJoin('products',
        'products.id', '=',
        'basketProducts.productId')
      .select('basket.*',
        'basketProducts.currentPrice',
        'basketProducts.productCount',
        'products.title')
    if (!result) {
      throw ApiError.badRequest(
        'Нет заказов для обработки',
        'BasketService getAllOrdersInProgressAllUsers')
    }
    return {
      success: true,
      result,
      message: 'Заказы которые нужно обработать загружены'
    }
  }

  async isUserBoughtProduct (userId: number, productId: number): Promise<boolean> {
    const result = await BasketProductsModel.query()
      .first()
      .where('basketProducts.productId', '=', productId)
      .innerJoin('basket',
        'basketProducts.basketId',
        'basket.id')
      .andWhere('basket.status', '=', 'Completed')
      .andWhere('basket.userId', '=', userId)
      .select(
        'basketProducts.productId as product',
        'basket.userId as user')
    return Boolean(result)
  }

  async updBasketById (id: number, Dto: IBasket): Promise<IMessage> {
    const {
      deliveryDate, comment, status,
      dateProcessing, forciblyUpd
    } = Dto
    const basket = await BasketModel.query()
      .findById(id)
      .select('*')
    if (!basket) {
      throw ApiError.badRequest(
        `Заказа с id${id} не существует`,
        'BasketService updBasketById')
    }
    if (!forciblyUpd && basket.status !== 'InProcessing') {
      throw ApiError.badRequest(
        `Заказ с id${id} не нуждается в обработке`,
        'BasketService updBasketById')
    }
    const result = await BasketModel.query()
      .where({ id })
      .update({
        status,
        comment: comment || '',
        dateProcessing,
        deliveryDate
      })
    if (!result) {
      throw ApiError.badRequest(
        `Не удалось обработать заказ с id${id}`,
        'BasketService updBasketById')
    }
    return {
      success: true,
      result,
      message: `Заказ с id${id} успешно обработан`
    }
  }
}

export default BasketService.getInstance()
