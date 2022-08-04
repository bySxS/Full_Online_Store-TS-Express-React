import { IMessage } from '@/interface'
import FavoritesProductsModel from './favoritesProducts.model'
import ApiError from '@/apiError'
import {
  IFavoritesProduct, IFavoritesProductService
} from './favoritesProducts.interface'
import { raw } from 'objection'
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
        `Произошла ошибка добавления в избранное продукта с id${productId}`,
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
        `Произошла ошибка при удаления из избранного продукта с id${productId}`,
        'FavoritesProductsService del')
    }
    return {
      success: true,
      result: product,
      message: `Продукт с id${productId} уделен из избранного`
    }
  }

  async getAllByUserId (userId: number, limit: number = 20, page: number = 1): Promise<IMessage> {
    const result = await FavoritesProductsModel.query()
      .page(page - 1, limit)
      .where('favoritesProducts.userId', '=', userId)
      .andWhere('productsPrice.priceTypeId', '=',
        raw('products.priceTypeId'))
      .innerJoin('products',
        'favoritesProducts.productId', '=',
        'products.id')
      .innerJoin('productsViews',
        'products.id', '=',
        'productsViews.productId')
      .innerJoin('productsPriceType',
        'products.priceTypeId', '=',
        'productsPriceType.id')
      .innerJoin('productsPrice',
        'products.id', '=',
        'productsPrice.productId')
      .innerJoin('category',
        'products.categoryId', '=',
        'category.id')
      .innerJoin('category as section',
        'section.id', '=',
        'category.parentId')
      .select('products.*',
        'productsViews.views as view',
        'productsPrice.price as price',
        'productsPrice.currency as priceCurrency',
        'productsPriceType.name as priceType',
        'category.name as categoryName',
        'section.name as sectionName')
    if (!result) {
      throw ApiError.badRequest(
        `Избранных продуктов на странице ${page} не найдено`,
        'FavoritesProductsService getAllByUserId')
    }
    return {
      success: true,
      result,
      message: `Страница ${page} с избранными продуктами успешно загружена`
    }
  }

  async getCountFavoritesByProductId (productId: number): Promise<IMessage> {
    const result = await FavoritesProductsModel.query()
      .where({ productId })
      .count('*', { as: 'countInFavorites' })
      .first()
    return {
      success: true,
      result,
      message: `Количество добавлений продукта в избранное с id${productId} получено`
    }
  }
}

export default FavoritesProductsService.getInstance()
