import CategoryService from '@/category/category.service'
import { IMessage } from '@/interface'
import { IGetProducts } from '@/products/products.interface'
import FavoritesProductsModel from './favoritesProducts.model'
import ApiError from '@/apiError'
import {
  IFavoritesProduct, IFavoritesProductService
} from './favoritesProducts.interface'
import ProductsService from '@/products/products.service'
import { filterMessage } from '@/service/filterMessage.service'

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

  async getAllByUserId ({
    userId,
    categoryId,
    filter,
    price,
    sort,
    limit = 20,
    page = 1
  }: IGetProducts): Promise<IMessage> {
    const ids = await CategoryService
      .getAllCategoryBySectionWithCache(categoryId)
    const queryWithCategory = () => {
      if (ids && ids.length > 0) {
        return ProductsService
          .getAllProductsWithFilter({
            limit, page, filter, price, sort
          }).whereIn('products.categoryId', ids)
      }
      return ProductsService
        .getAllProductsWithFilter({
          limit, page, filter, price, sort
        })
    }
    const query = () => {
      return queryWithCategory()
        .where('favorites.userId', '=', userId || '0')
    }
    let result = await query()
    if (!result || (result &&
      'total' in result && result.total === 0)) {
      return {
        success: false,
        message: `Избранных продуктов на странице ${page}` +
          `, у пользователя с ID${userId}, ` +
          filterMessage({
            filter, price, sort, categoryId
          }) +
          'не найдено'
      }
    }
    if ('results' in result) {
      result = await ProductsService
        .sortAndAddCharacteristicsToProducts(result)
    }
    return {
      success: true,
      result: { ...result, page, limit },
      message: `Страница ${page} с избранными продуктами, ` +
        `у пользователя с ID${userId}, ` +
        filterMessage({
          filter, price, sort, categoryId
        }) +
        'успешно загружена'
    }
  }

  async getAllListIdByUserId (
    userId: number
  ): Promise<IMessage> {
    const result = await FavoritesProductsModel.query()
      .where({ userId })
      .select('productId')
    if (!result) {
      return {
        success: false,
        message: 'Избранных продуктов' +
                 `, у пользователя с ID${userId}, ` +
                 'не найдено'
      }
    }
    return {
      success: true,
      result,
      message: 'Лист избранных продуктов, ' +
               `пользователя с ID${userId}, ` +
               'успешно загружен'
    }
  }
}

export default FavoritesProductsService.getInstance()
