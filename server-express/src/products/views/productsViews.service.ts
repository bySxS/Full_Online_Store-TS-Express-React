import { IProductViewService } from './productsViews.interface'
import { IMessage } from '../../interface'
import ProductsViewsModel from './productsViews.model'
import ApiError from '../../apiError'

class ProductsViewService implements IProductViewService {
  private static instance = new ProductsViewService()

  static getInstance (): ProductsViewService {
    if (!ProductsViewService.instance) {
      ProductsViewService.instance = new ProductsViewService()
    }
    return ProductsViewService.instance
  }

  async incrementViewById (id: number, count: number = 1): Promise<IMessage> {
    const result = await ProductsViewsModel.query()
      .where('product_id', '=', id)
      .increment('views', count)
      .select('views')
    if (!result) {
      throw ApiError.badRequest(
        `Ошибка добавления просмотров для продукта с id ${id}`,
        'ProductsViewService incrementViewById')
    }
    return {
      success: true,
      result,
      message: `Просмотры для продукта с id ${id} добавлены`
    }
  }

  async createViewsProduct (id: number): Promise<IMessage> {
    const result = await ProductsViewsModel.query()
      .insert({
        product_id: id
      })
      .select('views')
    if (!result) {
      throw ApiError.badRequest(
        `Таблица просмотров для продукта с id ${id} не создана`,
        'ProductsViewService createViewsProduct')
    }
    return {
      success: true,
      result,
      message: `Таблица просмотров для продукта с id ${id} инициализирована`
    }
  }
}

export default ProductsViewService.getInstance()
