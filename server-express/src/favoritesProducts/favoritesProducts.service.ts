import { IMessage } from '@/interface'
import FavoritesProductsModel from './favoritesProducts.model'
import ApiError from '@/apiError'
import {
  IFavoritesProduct, IFavoritesProductService
} from './favoritesProducts.interface'
import ProductsService from '@/products/products.service'

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
    const alreadyAdded = await FavoritesProductsModel.query()
      .where({ userId })
      .andWhere({ productId })
      .first()
    if (alreadyAdded) {
      throw ApiError.badRequest(
        'Продукт уже добавлен в избранное',
        'FavoritesProductsService add')
    }
    await ProductsService.getById(productId, false)
    const result = await FavoritesProductsModel.query()
      .insert({
        userId: +userId,
        productId: +productId
      })
    if (!result) {
      throw ApiError.badRequest(
        'Произошла ошибка добавления в ' +
        `избранное продукта с id${productId}`,
        'FavoritesProductsService add')
    }
    return {
      success: true,
      result,
      message: `Продукт с id${productId} успешно добавлен в избранное`
    }
  }

  async del (Dto: IFavoritesProduct): Promise<IMessage> {
    const { productId, userId } = Dto
    const product = await FavoritesProductsModel.query()
      .where({ userId })
      .andWhere({ productId })
      .first()
    if (!product) {
      throw ApiError.badRequest(
        `Продукта с id${productId} нет в избранном`,
        'FavoritesProductsService del')
    }
    const result = await FavoritesProductsModel.query()
      .deleteById(product.id)
    if (!result) {
      throw ApiError.badRequest(
        'Произошла ошибка при удаления из ' +
        `избранного продукта с id${productId}`,
        'FavoritesProductsService del')
    }
    return {
      success: true,
      result: product,
      message: `Продукт с id${productId} уделен из избранного`
    }
  }

  async getAllByUserId (
    userId: number,
    filter: string[],
    price: number[],
    sortBy: string,
    limit: number = 20,
    page: number = 1
  ): Promise<IMessage> {
    const query = () => {
      return ProductsService
        .getAllProductsWithFilter(limit, page, filter, price, sortBy)
        .where('favorites.userId', '=', userId)
    }
    const result = await query()
    if (!result || (result &&
      'total' in result && result.total === 0)) {
      return {
        success: false,
        message: `Избранных продуктов на странице ${page}` +
          `, у пользователя с ID${userId}, ` +
          (filter[0] !== '' ? `c фильтрами (${filter.join(', ')}), ` : '') +
          (price[0] !== 0 ? `цены от ${price.join(' до ')}, ` : '') +
          (sortBy !== '' ? `сортировкой '${sortBy}' ` : '') +
          'не найдено'
      }
    }
    return {
      success: true,
      result,
      message: `Страница ${page} с избранными продуктами, ` +
        `у пользователя с ID${userId}, ` +
        (filter[0] !== '' ? `c фильтрами (${filter.join(', ')}), ` : '') +
        (price[0] !== 0 ? `цены от ${price.join(' до ')}, ` : '') +
        (sortBy !== '' ? `сортировкой '${sortBy}' ` : '') +
        'успешно загружена'
    }
  }
}

export default FavoritesProductsService.getInstance()
