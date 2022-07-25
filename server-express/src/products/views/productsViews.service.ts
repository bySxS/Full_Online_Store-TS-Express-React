import { IProductViewService } from './productsViews.interface'
import { IMessage } from '@/interface'
import ProductsViewsModel from './productsViews.model'
import ApiError from '@/apiError'

class ProductsViewService implements IProductViewService {
  private static instance = new ProductsViewService()

  static getInstance (): ProductsViewService {
    if (!ProductsViewService.instance) {
      ProductsViewService.instance = new ProductsViewService()
    }
    return ProductsViewService.instance
  }

  async incrementViewById (
    productId: number, count: number = 1
  ): Promise<IMessage> {
    const result = await ProductsViewsModel.query()
      .where({ productId })
      .increment('views', count)
      .select('views')
    if (!result) {
      throw ApiError.badRequest(
        `Ошибка добавления просмотров для продукта с id${productId}`,
        'ProductsViewService incrementViewById')
    }
    return {
      success: true,
      result,
      message: `Просмотры для продукта с id${productId} добавлены`
    }
  }

  async decrementViewById (
    productId: number, count: number = 1
  ): Promise<IMessage> {
    const result = await ProductsViewsModel.query()
      .where({ productId })
      .decrement('views', count)
      .select('views')
    if (!result) {
      throw ApiError.badRequest(
        `Ошибка уменьшения просмотров для продукта с id${productId}`,
        'ProductsViewService decrementViewById')
    }
    return {
      success: true,
      result,
      message: `Просмотры для продукта с id${productId} уменьшены`
    }
  }

  async createViewsProduct (productId: number): Promise<IMessage> {
    const result = await ProductsViewsModel.query()
      .insert({ productId })
      .select('views')
    if (!result) {
      throw ApiError.badRequest(
        `Поле просмотров для продукта с id${productId} не создана`,
        'ProductsViewService createViewsProduct')
    }
    return {
      success: true,
      result,
      message: `Поле просмотров для продукта с id${productId} инициализировано`
    }
  }
}

export default ProductsViewService.getInstance()
