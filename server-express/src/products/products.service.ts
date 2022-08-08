import { IProduct, IProductFilesArray, IProductService } from './products.interface'
import { IMessage } from '@/interface'
import path from 'path'
import ProductsModel from './products.model'
import ApiError from '../apiError'
import fs from 'fs-extra'
import ProductsViewsService from './views/productsViews.service'
import ProductsPriceService from './prices/productsPrice.service'
import { cacheRedisDB } from '@/cache'
import { Page, QueryBuilder, raw } from 'objection'
import FavoritesProductsService from '@/favoritesProducts/favoritesProducts.service'
import { div } from '@/service/math.service'
import { delFile, saveFile } from '@/service/file.service'

class ProductsService implements IProductService {
  private static instance = new ProductsService()

  static getInstance (): ProductsService {
    if (!ProductsService.instance) {
      ProductsService.instance = new ProductsService()
    }
    return ProductsService.instance
  }

  async updatePictures (
    id: number,
    DtoFile: IProductFilesArray | null,
    Dto: IProduct | null = null,
    findProduct: ProductsModel | undefined = undefined
  ): Promise<string> {
    if (!id || isNaN(id)) {
      throw ApiError.badRequest(
        'ID продукта не верный, для обновления изображений',
        'ProductsService updatePictures')
    }

    const numberDir = div(id, 100)
    const pathDir = path.resolve(
      __dirname, '../..', 'static/products_pic', String(numberDir)
    )
    fs.mkdirsSync(pathDir)

    let fileNameScreen = ''
    let fileNameImage1 = ''
    let fileNameImage2 = ''
    let fileNameImage3 = ''
    let fileNameImage4 = ''
    let fileNameImage5 = ''
    let fileNameImage6 = ''
    let fileNameImage7 = ''
    let fileNameImage8 = ''
    let fileNameImage9 = ''
    let fileNameImage10 = ''

    if (Dto) {
      const {
        delScreen, delImage1, delImage2, delImage3,
        delImage4, delImage5, delImage6, delImage7,
        delImage8, delImage9, delImage10
      } = Dto
      if (findProduct) {
        fileNameScreen =
          await delFile(Boolean(delScreen), findProduct.screen, pathDir)
        fileNameImage1 =
          await delFile(Boolean(delImage1), findProduct.image1, pathDir)
        fileNameImage2 =
          await delFile(Boolean(delImage2), findProduct.image2, pathDir)
        fileNameImage3 =
          await delFile(Boolean(delImage3), findProduct.image3, pathDir)
        fileNameImage4 =
          await delFile(Boolean(delImage4), findProduct.image4, pathDir)
        fileNameImage5 =
          await delFile(Boolean(delImage5), findProduct.image5, pathDir)
        fileNameImage6 =
          await delFile(Boolean(delImage6), findProduct.image6, pathDir)
        fileNameImage7 =
          await delFile(Boolean(delImage7), findProduct.image7, pathDir)
        fileNameImage8 =
          await delFile(Boolean(delImage8), findProduct.image8, pathDir)
        fileNameImage9 =
          await delFile(Boolean(delImage9), findProduct.image9, pathDir)
        fileNameImage10 =
          await delFile(Boolean(delImage10), findProduct.image10, pathDir)
      }
    }
    if (DtoFile) {
      const {
        screen, image1, image2, image3,
        image4, image5, image6, image7,
        image8, image9, image10
      } = DtoFile
      fileNameScreen =
        await saveFile(id, pathDir, screen, fileNameScreen, 'screen')
      fileNameImage1 =
        await saveFile(id, pathDir, image1, fileNameImage1, 'image1')
      fileNameImage2 =
        await saveFile(id, pathDir, image2, fileNameImage2, 'image2')
      fileNameImage3 =
        await saveFile(id, pathDir, image3, fileNameImage3, 'image3')
      fileNameImage4 =
        await saveFile(id, pathDir, image4, fileNameImage4, 'image4')
      fileNameImage5 =
        await saveFile(id, pathDir, image5, fileNameImage5, 'image5')
      fileNameImage6 =
        await saveFile(id, pathDir, image6, fileNameImage6, 'image6')
      fileNameImage7 =
        await saveFile(id, pathDir, image7, fileNameImage7, 'image7')
      fileNameImage8 =
        await saveFile(id, pathDir, image8, fileNameImage8, 'image8')
      fileNameImage9 =
        await saveFile(id, pathDir, image9, fileNameImage9, 'image9')
      fileNameImage10 =
        await saveFile(id, pathDir, image10, fileNameImage10, 'image10')
    }
    const result = await ProductsModel.query()
      .where({ id })
      .update({
        screen: fileNameScreen,
        image1: fileNameImage1,
        image2: fileNameImage2,
        image3: fileNameImage3,
        image4: fileNameImage4,
        image5: fileNameImage5,
        image6: fileNameImage6,
        image7: fileNameImage7,
        image8: fileNameImage8,
        image9: fileNameImage9,
        image10: fileNameImage10
      })
    if (!result) {
      throw ApiError.badRequest(
        `Изображения для продукта с id${id} не обновлены`,
        'ProductsService updatePictures')
    }
    return `Изображения для продукта с id${id} успешно обновлены`
  }

  async add (
    Dto: IProduct, DtoFile: IProductFilesArray
  ): Promise<IMessage> {
    const {
      title, price, categoryId, userId,
      description, count, availability,
      parentId, videoYoutubeUrl, url
    } = Dto
    const priceTypeId = 1
    const findProduct = await ProductsModel.query()
      .findOne({ title })
      .select('title')
    if (findProduct) {
      throw ApiError.badRequest(
        `Продукт ${title} уже существует`,
        'ProductsService add')
    }
    if (parentId && parentId > 0) {
      const parentProduct = await ProductsModel.query()
        .findOne({ id: parentId })
        .select('title')
      if (parentProduct) {
        throw ApiError.badRequest(
          `Родительского продукта с id ${parentId} не существует`,
          'ProductsService add')
      }
    }
    const product = await ProductsModel.query()
      .insert({
        title,
        categoryId: +categoryId,
        userId: +userId,
        description,
        count: +count,
        availability: Boolean(availability),
        parentId,
        videoYoutubeUrl,
        url,
        screen: '',
        priceTypeId
      })
      .select('*')

    if (!product) {
      throw ApiError.badRequest(
        'Продукт не добавлен',
        'ProductsService add')
    }

    const imgResult =
      await this.updatePictures(product.id, DtoFile)
    const views =
      await ProductsViewsService.createViewsProduct(product.id)
    const priceCommon =
      await ProductsPriceService.addPriceForProduct({
        priceTypeId,
        productId: product.id,
        price: +price
      })
    return {
      success: true,
      result: product,
      message: `Продукт с id ${product.id} успешно добавлен; ${imgResult}; ${views.message}; ${priceCommon.message}`
    }
  }

  async updateById (
    id: number, Dto: IProduct, DtoFile: IProductFilesArray
  ): Promise<IMessage> {
    const {
      title, price, priceTypeId, categoryId, userId,
      description, count, availability,
      parentId, videoYoutubeUrl, url
    } = Dto
    const findProduct = await this.getProductById(id)
    if (!findProduct) {
      throw ApiError.badRequest(
        `Продукта с id ${id} не существует`,
        'ProductsService updateById')
    }
    if (parentId && parentId > 0) {
      const parentProduct = await ProductsModel.query()
        .findOne({ id: parentId })
        .select('title')
      if (parentProduct) {
        throw ApiError.badRequest(
          `Родительского продукта с id ${parentId} не существует`,
          'ProductsService add')
      }
    }
    const product = await ProductsModel.query()
      .where({ id })
      .update({
        title,
        categoryId: +categoryId,
        userId: +userId,
        description,
        count: +count,
        availability: Boolean(availability),
        parentId,
        videoYoutubeUrl,
        url,
        priceTypeId: +priceTypeId
      })

    if (!product) {
      throw ApiError.badRequest(
        'Продукт не обновлён',
        'ProductsService updateById')
    }
    const imgResult =
      await this.updatePictures(id, DtoFile, Dto, findProduct)
    const getPrice =
      await ProductsPriceService.getProductPriceByTypesPricesId(+priceTypeId, id)
    const prices =
      await ProductsPriceService.updProductPrice(getPrice.result.id, {
        productId: id,
        priceTypeId: +priceTypeId,
        price: +price
      })
    await cacheRedisDB.del('product:' + id) // удаляем кеш

    return {
      success: true,
      result: product,
      message: `Продукт с id ${id} успешно обновлён; ${imgResult}; ${prices.message}`
    }
  }

  async deleteById (id: number): Promise<IMessage> {
    const findProduct = await ProductsModel.query()
      .findById(id)
      .select('*')
    const Dto = {
      delScreen: true,
      delImage1: true,
      delImage2: true,
      delImage3: true,
      delImage4: true,
      delImage5: true,
      delImage6: true,
      delImage7: true,
      delImage8: true,
      delImage9: true,
      delImage10: true
    } as IProduct
    const imgResult =
      await this.updatePictures(id, null, Dto, findProduct)
    const product = await ProductsModel.query()
      .deleteById(id)
    if (!product) {
      throw ApiError.badRequest(
        `Продукт не удалён, потому что нет продукта с id${id}`,
        'ProductsService deleteById')
    }
    return {
      success: true,
      message: `Продукт с id ${id} успешно удалён; ${imgResult}`
    }
  }

  getProductById (id: number): QueryBuilder<ProductsModel, ProductsModel | undefined> {
    return ProductsModel.query()
      .where('products.id', '=', id)
      .andWhere('price.priceTypeId', '=',
        raw('products.priceTypeId'))
      .andWhere('priceType.id', '=',
        raw('products.priceTypeId'))
      .first()
      .joinRelated('views')
      .joinRelated('priceType')
      .joinRelated('price')
      .joinRelated('category')
      .joinRelated('category.parent', { alias: 'section' })
      .select('products.*',
        'views.views as view',
        'price.id as priceId',
        'price.price as price',
        'price.currency as priceCurrency',
        'priceType.name as priceType',
        'category.name as categoryName',
        'section.name as sectionName')
      .groupBy('price.id',
        'price.price',
        'price.currency')
  }

  getAllProducts (
    title: string = '', limit: number = 20, page: number = 1
  ): QueryBuilder<ProductsModel, Page<ProductsModel>> {
    return ProductsModel.query()
      .page(page - 1, limit)
      .where('products.title', 'like', `%${title}%`)
      .andWhere('price.priceTypeId', '=',
        raw('products.priceTypeId'))
      .andWhere('priceType.id', '=',
        raw('products.priceTypeId'))
      .joinRelated('views')
      .joinRelated('priceType')
      .joinRelated('price')
      .joinRelated('category')
      .joinRelated('category.parent', { alias: 'section' })
      .select('products.*',
        'views.views as view',
        'price.id as priceId',
        'price.price as price',
        'price.currency as priceCurrency',
        'priceType.name as priceType',
        'category.name as categoryName',
        'section.name as sectionName')
  }

  async getById (id: number, incView: boolean = true): Promise<IMessage> {
    const cacheProduct = await cacheRedisDB.get('product:' + id)
    if (cacheProduct) {
      if (incView) {
        await ProductsViewsService.incrementViewById(id)
      }
      await cacheRedisDB.expire('product:' + id, 3600) // удалять через час
      return {
        success: true,
        result: JSON.parse(cacheProduct),
        message: `Продукт с id ${id} успешно получен с кеша`
      }
    }
    const product = await this.getProductById(id)
    if (!product) {
      throw ApiError.notFound(
        `Продукта с id ${id} не существует`,
        'ProductsService getById')
    }
    if (incView) {
      await ProductsViewsService.incrementViewById(id)
    }
    const countFavorites =
      await FavoritesProductsService.getCountFavoritesByProductId(id)
    let parentProduct = null
    if (product.parentId !== null && !isNaN(product.parentId)) {
      parentProduct = await this.getProductById(product.parentId)
    }
    const result = {
      ...product,
      ...countFavorites.result,
      parentProduct
    }
    await cacheRedisDB.set('product:' + id, JSON.stringify(result))
    await cacheRedisDB.expire('product:' + id, 3600) // удалять через час
    return {
      success: true,
      result,
      message: `Продукт с id ${id} успешно получен`
    }
  }

  async getAll (
    limit: number = 20, page: number = 1
  ): Promise<IMessage> {
    const result = await this.getAllProducts('', limit, page)
    if (!result) {
      return {
        success: false,
        message: `Продуктов на странице ${page} не найдено`
      }
    }
    return {
      success: true,
      result,
      message: `Страница ${page} продуктов успешно загружена`
    }
  }

  getAllProductsByCategoryId (
    id: number, price: number[], limit: number = 20, page: number = 1
  ): QueryBuilder<ProductsModel, Page<ProductsModel>> {
    if (price.length === 1) {
      price.push(price[0])
    }
    return ProductsModel.query()
      .page(page - 1, limit)
      .where('products.categoryId', '=', id)
      .andWhere('priceType.id', '=',
        raw('products.priceTypeId'))
      .andWhere('price.priceTypeId', '=',
        raw('priceType.id'))
      .andWhere('price.price', '>=', price[0])
      .andWhere('price.price', '<=', price[1])
      .leftOuterJoinRelated('views')
      .leftOuterJoinRelated('priceType')
      .leftOuterJoinRelated('price')
      .leftOuterJoinRelated('category')
      .leftOuterJoinRelated('category.parent', { alias: 'section' })
      .leftOuterJoinRelated('characteristicsValues')
      .leftOuterJoinRelated('reviews')
      .select('products.*',
        'views.views as view',
        'price.id as priceId',
        raw('avg(reviews.rating) as rating'),
        'price.price as price',
        'price.currency as priceCurrency',
        'priceType.name as priceType',
        'category.name as categoryName',
        'section.name as sectionName')
      .groupBy('products.id',
        'price.id')
  }

  async getAllByCategoryIdAndFilter (
    id: number,
    filter: string[],
    price: number[],
    sortBy: string,
    limit: number = 20,
    page: number = 1
  ): Promise<IMessage> {
    const filterQuery = (): QueryBuilder<ProductsModel, Page<ProductsModel>> => {
      if (filter[0] === '') {
        return this.getAllProductsByCategoryId(id, price, limit, page)
      } else {
        return this.getAllProductsByCategoryId(id, price, limit, page)
          .whereIn('characteristicsValues.value', filter)
      }
    }

    const groupByQuery = (): QueryBuilder<ProductsModel, Page<ProductsModel>> => {
      switch (sortBy) {
        case 'priceAsc': return filterQuery().orderBy('price.price', 'asc')
        case 'priceDesc': return filterQuery().orderBy('price.price', 'desc')
        default: return filterQuery()
      }
    }
    const result = await groupByQuery()

    if (result.total === 0) {
      return {
        success: false,
        message: `Продуктов на странице ${page}, c ID${id} категории, фильтров (${filter.join(', ')}) и цены от ${price.join(' до ')} не найдено`
      }
    }
    return {
      success: true,
      result,
      message: `Страница ${page} продуктов, c ID${id} категории, фильтров (${filter.join(',')}) и цены от ${price.join(' до ')} успешно загружена`
    }
  }

  async search (
    title: string = '', limit: number = 20, page: number = 1
  ): Promise<IMessage> {
    const result = await this.getAllProducts(title, limit, page)
    if (!result) {
      return {
        success: false,
        message: `Поиск ничего не нашёл по запросу ${title}`
      }
    }
    return {
      success: true,
      result,
      message: 'Поиск прошёл успешно'
    }
  }
}

export default ProductsService.getInstance()
