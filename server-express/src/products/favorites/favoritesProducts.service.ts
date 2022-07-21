import { IMessage } from '@/interface'
import FavoritesProductsModel from './favoritesProducts.model'
import ApiError from '@/apiError'
import { IFavoritesProduct, IFavoritesProductService } from '@/products/favorites/favoritesProducts.interface'
import { raw } from 'objection'

class FavoritesProductsService implements IFavoritesProductService {
  private static instance = new FavoritesProductsService()

  static getInstance (): FavoritesProductsService {
    if (!FavoritesProductsService.instance) {
      FavoritesProductsService.instance = new FavoritesProductsService()
    }
    return FavoritesProductsService.instance
  }

  async add (Dto: IFavoritesProduct): Promise<IMessage> {
    const { productId, userId } = Dto
    if (!productId || !userId) {
      throw ApiError.badRequest(
        'Произошла ошибка добавления в избранное продукта,' +
        'не указан productId или userId',
        'FavoritesProductsService add')
    }
    const result = await FavoritesProductsModel.query()
      .insert({
        user_id: userId,
        product_id: productId
      })
    if (!result) {
      throw ApiError.badRequest(
        `Произошла ошибка добавления в избранное продукта с id${productId}`,
        'FavoritesProductsService add')
    }
    return {
      success: true,
      result,
      message: `Продукт с id${productId} добавлен в избранное`
    }
  }

  async del (id: number): Promise<IMessage> {
    const result = await FavoritesProductsModel.query()
      .deleteById(id)
    if (!result) {
      throw ApiError.badRequest(
        `Произошла ошибка при удаления из избранного продукта с id${id}`,
        'FavoritesProductsService del')
    }
    return {
      success: true,
      result,
      message: `Продукт с id${id} уделен из избранного`
    }
  }

  async getAllByUserId (userId: number, limit: number = 20, page: number = 1): Promise<IMessage> {
    const result = await FavoritesProductsModel.query()
      .page(page - 1, limit)
      .where('favorites_products.user_id', '=', userId)
      .innerJoin('products', 'favorites_products.product_id', 'products.id')
      .innerJoin('products_views', raw('products.id'), '=', 'products_views.product_id')
      .innerJoin('products_price', 'products.id', '=', 'products_price.product_id')
      .select('products.*',
        'products_views.views as view',
        'products_price.price as price',
        'products_price.currency as priceCurrency')
    if (!result) {
      throw ApiError.badRequest(
        `Избранных продуктов на странице ${page} не найдено`,
        'FavoritesProductsService getAll')
    }
    return {
      success: true,
      result,
      message: `Страница ${page} с избранными продуктами успешно загружена`
    }
  }

  async getCountFavoritesByProductId (id: number): Promise<IMessage> {
    const result = await FavoritesProductsModel.query()
      .where('product_id', '=', id)
      .count('*', { as: 'countInFavorites' })
      .first()
    // if (!result) {
    //   result.
    // }
    return {
      success: true,
      result: result,
      message: `Количество добавлений продукта в избранное с id${id} получено`
    }
  }
}

export default FavoritesProductsService.getInstance()
