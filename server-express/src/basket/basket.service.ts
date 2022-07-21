import { IBasketProduct, IBasketService } from '@/basket/basket.interface'
import { IMessage } from '@/interface'
import ApiError from '@/apiError'
import BasketModel from '@/basket/basket.model'
import BasketProductsModel from '@/basket/basketProducts.model'
import { raw } from 'objection'

class BasketService implements IBasketService {
  private static instance = new BasketService()

  static getInstance (): BasketService {
    if (!BasketService.instance) {
      BasketService.instance = new BasketService()
    }
    return BasketService.instance
  }

  async getCurrentBasketByUserId (id: number): Promise<IMessage> {
    if (isNaN(id)) {
      throw ApiError.forbidden(
        'ID должен быть с цифр',
        'BasketService getCurrentBasketByUserId')
    }
    let result = await BasketModel.query()
      .groupBy('basket.id')
      .findOne({ 'basket.user_id': id, 'basket.status': 'Selects the product' })
      .innerJoin('basket_products', 'basket.id', '=', 'basket_products.basket_id')
      .select('basket.*', 'basket_products.* as BasketProducts')
    if (!result) { // нету корзины свободной придётся создать
      result = await BasketModel.query()
        .insert({
          user_id: id,
          status: 'Selects the product'
        })
        .select('*')
    }
    return {
      success: true,
      result,
      message: `Текущая корзина для пользователя с id${id} получена`
    }
  }

  async getAllOrdersByUserId (id: number, limit: number = 20, page: number = 1): Promise<IMessage> {
    if (isNaN(id)) {
      throw ApiError.forbidden(
        'ID должен быть с цифр',
        'BasketService getAllOrdersByUserId')
    }
    const result = await BasketModel.query()
      .page(page - 1, limit)
      .where({ 'basket.user_id': id })
      .andWhere({ 'basket.status': 'In processing' })
      .andWhere({ 'basket.status': 'completed' })
      .innerJoin('basket_products', 'basket.id', '=', 'basket_products.basket_id')
      .select('basket.*', 'basket_products.* as BasketProducts')
    if (!result) {
      throw ApiError.badRequest(
        `У пользователя с id${id} нет заказов`,
        'BasketService getAllOrdersByUserId')
    }
    return {
      success: true,
      result,
      message: `Текущая корзина для пользователя с id${id} получена`
    }
  }

  async addProductToBasket (userId: number, Dto: IBasketProduct): Promise<IMessage> {
    const {
      basketId, productId, productCount,
      productPriceId, currentPrice
    } = Dto
    const findCurrentBasket = await this.getCurrentBasketByUserId(userId)
    console.log('addBasketProduct', findCurrentBasket)
    if (findCurrentBasket.result.BasketProducts.product_id === productId) {
      throw ApiError.badRequest(
        `Продукт с id${productId} уже в корзине`,
        'BasketService addBasketProduct')
    }
    const result = await BasketProductsModel.query()
      .insert({
        basket_id: basketId,
        product_id: productId,
        product_price_id: productPriceId,
        current_price: currentPrice,
        product_count: productCount
      })
    if (!result) {
      throw ApiError.badRequest(
        `Ошибка при добавлении продукта с id${productId} в корзину`,
        'BasketService addBasketProduct')
    }
    return {
      success: true,
      result,
      message: `Продукт с id${productId} успешно добавлен в корзину`
    }
  }

  async delProductFromBasket (id: number): Promise<IMessage> {
    if (isNaN(id)) {
      throw ApiError.forbidden(
        'ID должен быть с цифр',
        'BasketService delBasketProduct')
    }
    const result = await BasketProductsModel.query()
      .deleteById(id)
    if (!result) {
      throw ApiError.badRequest(
        `Ошибка удаления продукта с id${id} в корзину`,
        'BasketService delBasketProduct')
    }
    return {
      success: true,
      result,
      message: `Продукт с id${id} успешно удалён из корзины`
    }
  }

  async getAllOrdersInProgressAllUsers (limit: number, page: number): Promise<IMessage> {
    const result = await BasketModel.query()
      .page(page - 1, limit)
      .where({ 'basket.status': 'In processing' })
      .innerJoin('basket_products', 'basket.id', '=', 'basket_products.basket_id')
      .select('basket.*', 'basket_products.* as BasketProducts')
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
      .where('basket_products.product_id', '=', productId)
      .innerJoin('basket', raw('basket_products.basket_id'), 'basket.id')
      .andWhere('basket.status', '=', 'completed')
      .andWhere('basket.user_id', '=', userId)
      .select('basket_products.product_id as product', 'basket.user_id as user')
    return Boolean(result)
  }
}

export default BasketService.getInstance()
