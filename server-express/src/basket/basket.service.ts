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

  async getCurrentBasketByUserId (userId: number): Promise<IMessage> {
    let basket = await BasketModel.query()
      .where('basket.user_id', '=', userId)
      .andWhere('basket.status', '=', 'Selects the product')
      .first()
      // .innerJoin('basket_products', 'basket.id', '=', 'basket_products.basket_id')
      // .innerJoin('products', 'basket_products.product_id', '=', 'products.id')
      .select('basket.*')
    // 'basket_products.product_id as productId',
    // 'products.title as productTitle')
    if (!basket) { // нету корзины свободной придётся создать
      basket = await BasketModel.query()
        .insert({
          user_id: +userId,
          status: 'Selects the product'
        })
        .select('*')
    }
    const productsInBasket = await BasketProductsModel.query()
      .where('basket_products.basket_id', '=', basket.id)
      .andWhere('products_price_type.id', '=', raw('products.price_type_id'))
      .innerJoin('products',
        'basket_products.product_id', '=',
        'products.id')
      .innerJoin('category',
        'category.id', '=',
        'products.category_id')
      .innerJoin('products_price_type',
        'products_price_type.id', '=',
        'products.price_type_id')
      .select('basket_products.*',
        'products.title as productTitle',
        'category.name as productCategory',
        'products.screen as productScreen',
        'products_price_type.name as productPriceType',
        'products.availability as productAvailability')
    return {
      success: true,
      result: { ...basket, BasketProducts: productsInBasket },
      message: `Текущая корзина для пользователя с id${userId} получена`
    }
  }

  async addProductToBasket (userId: number, Dto: IBasketProduct): Promise<IMessage> {
    const {
      productId, productCount
    } = Dto
    const findCurrentBasket = await this.getCurrentBasketByUserId(userId)
    findCurrentBasket.result.BasketProducts.forEach((product: { product_id: number }) => {
      if (product.product_id === +productId) {
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
        basket_id: findCurrentBasket.result.id,
        product_id: +productId,
        product_price_id: product.result.priceId,
        current_price: (product.result.price * +productCount),
        product_count: +productCount
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

  async delProductFromBasket (userId: number, productId: number): Promise<IMessage> {
    const findCurrentBasket = await this.getCurrentBasketByUserId(userId)
    let id
    findCurrentBasket.result.BasketProducts.forEach((product: { id: number, product_id: number }) => {
      if (product.product_id === +productId) {
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

  async getAllOrdersByUserId (userId: number, limit: number = 20, page: number = 1): Promise<IMessage> {
    const result = await BasketModel.query()
      .page(page - 1, limit)
      .where('basket.status', '=', 'In processing')
      .orWhere('basket.status', '=', 'completed')
      .andWhere('basket.user_id', '=', userId)
      .innerJoin('basket_products',
        'basket.id', '=',
        'basket_products.basket_id')
      .innerJoin('products',
        'products.id', '=',
        'basket_products.product_id')
      .select('basket.*',
        'basket_products.current_price',
        'basket_products.product_count',
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
      .where({ 'basket.status': 'In processing' })
      .innerJoin('basket_products',
        'basket.id', '=',
        'basket_products.basket_id')
      .innerJoin('products',
        'products.id', '=',
        'basket_products.product_id')
      .select('basket.*',
        'basket_products.current_price',
        'basket_products.product_count',
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
      .where('basket_products.product_id', '=', productId)
      .innerJoin('basket', 'basket_products.basket_id', 'basket.id')
      .andWhere('basket.status', '=', 'completed')
      .andWhere('basket.user_id', '=', userId)
      .select('basket_products.product_id as product', 'basket.user_id as user')
    return Boolean(result)
  }
}

export default BasketService.getInstance()
