import { IProduct, IProductFilesArray, IProductService } from './products.interface'
import { IMessage } from '../interface'
import path from 'path'
import ProductsModel from './products.model'
import ApiError from '../apiError'
import fs from 'fs-extra'
import { UploadedFile } from 'express-fileupload'
import logger from '../logger'
import ProductsViewsService from './views/productsViews.service'
import ProductsPriceService from './prices/productsPrice.service'

function div (val: number, by: number): number {
  return (val - val % by) / by
}

class ProductsService implements IProductService {
  private static instance = new ProductsService()

  static getInstance (): ProductsService {
    if (!ProductsService.instance) {
      ProductsService.instance = new ProductsService()
    }
    return ProductsService.instance
  }

  async delPicture (delPic: boolean, fileName: string, pathDir: string): Promise<string> {
    let name = fileName || ''
    if (delPic) {
      if (name && name.length > 2) {
        logger.info('удаляем ' + name)
        await fs.remove(pathDir + '/' + name)
        name = ''
      }
    }
    return name
  }

  async savePicture (id: number, pathDir: string, file: UploadedFile, fileName: string, fileName2: string): Promise<string> {
    let name = ''
    if (file && file.name.length > 2) {
      const splitName = file.name.split('.') || ['']
      const extension = splitName[splitName.length - 1] || 'jpg'
      name = `${id}_${fileName2}.${extension}`
      logger.info('сохраняем ' + name)
      await file.mv(pathDir + '/' + name)
    } else if (fileName.split('.').length > 1) {
      name = fileName
    }
    return name
  }

  async updatePictures (id: number, DtoFile: IProductFilesArray, Dto: IProduct, findProduct: ProductsModel | null): Promise<string> {
    if (!id || isNaN(id)) {
      throw ApiError.badRequest(
        'ID продукта не верный, для обновления изображений',
        'ProductsService updatePictures')
    }
    const {
      delScreen, delImage1, delImage2, delImage3,
      delImage4, delImage5, delImage6, delImage7,
      delImage8, delImage9, delImage10
    } = Dto

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

    if (findProduct) {
      fileNameScreen = await this.delPicture(Boolean(delScreen), findProduct.screen, pathDir)
      fileNameImage1 = await this.delPicture(Boolean(delImage1), findProduct.image1, pathDir)
      fileNameImage2 = await this.delPicture(Boolean(delImage2), findProduct.image2, pathDir)
      fileNameImage3 = await this.delPicture(Boolean(delImage3), findProduct.image3, pathDir)
      fileNameImage4 = await this.delPicture(Boolean(delImage4), findProduct.image4, pathDir)
      fileNameImage5 = await this.delPicture(Boolean(delImage5), findProduct.image5, pathDir)
      fileNameImage6 = await this.delPicture(Boolean(delImage6), findProduct.image6, pathDir)
      fileNameImage7 = await this.delPicture(Boolean(delImage7), findProduct.image7, pathDir)
      fileNameImage8 = await this.delPicture(Boolean(delImage8), findProduct.image8, pathDir)
      fileNameImage9 = await this.delPicture(Boolean(delImage9), findProduct.image9, pathDir)
      fileNameImage10 = await this.delPicture(Boolean(delImage10), findProduct.image10, pathDir)
    }
    if (DtoFile) {
      const {
        screen, image1, image2, image3,
        image4, image5, image6, image7,
        image8, image9, image10
      } = DtoFile
      fileNameScreen = await this.savePicture(id, pathDir, screen, fileNameScreen, 'screen')
      fileNameImage1 = await this.savePicture(id, pathDir, image1, fileNameImage1, 'image1')
      fileNameImage2 = await this.savePicture(id, pathDir, image2, fileNameImage2, 'image2')
      fileNameImage3 = await this.savePicture(id, pathDir, image3, fileNameImage3, 'image3')
      fileNameImage4 = await this.savePicture(id, pathDir, image4, fileNameImage4, 'image4')
      fileNameImage5 = await this.savePicture(id, pathDir, image5, fileNameImage5, 'image5')
      fileNameImage6 = await this.savePicture(id, pathDir, image6, fileNameImage6, 'image6')
      fileNameImage7 = await this.savePicture(id, pathDir, image7, fileNameImage7, 'image7')
      fileNameImage8 = await this.savePicture(id, pathDir, image8, fileNameImage8, 'image8')
      fileNameImage9 = await this.savePicture(id, pathDir, image9, fileNameImage9, 'image9')
      fileNameImage10 = await this.savePicture(id, pathDir, image10, fileNameImage10, 'image10')
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
        'Изображения не обновлены',
        'ProductsService updatePictures')
    }
    return `Изображения для продукта с id ${id} успешно обновлены`
  }

  async add (Dto: IProduct, DtoFile: IProductFilesArray): Promise<IMessage> {
    const {
      title, price, categoryId, userId,
      description, count, availability,
      parentId, videoYoutubeUrl, url
    } = Dto
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
        category_id: +categoryId,
        user_id: +userId,
        description,
        count: +count,
        availability: Boolean(availability),
        parent_id: parentId,
        video_youtube_url: videoYoutubeUrl,
        url,
        screen: ''
      })
      .select('*')

    if (!product) {
      throw ApiError.badRequest(
        'Продукт не добавлен',
        'ProductsService add')
    }

    const imgResult = await this.updatePictures(product.id, DtoFile, Dto, null)
    const views = await ProductsViewsService.createViewsProduct(product.id)
    const priceCommon = await ProductsPriceService.createProductPrice({
      priceTypeId: 1,
      productId: product.id,
      price
    })
    return {
      success: true,
      result: product,
      message: `Продукт с id ${product.id} успешно добавлен; ${imgResult}; ${views.message}; ${priceCommon.message}`
    }
  }

  async updateById (id: number, Dto: IProduct, DtoFile: IProductFilesArray): Promise<IMessage> {
    const {
      title, price, priceTypeId, categoryId, userId,
      description, count, availability,
      parentId, videoYoutubeUrl, url
    } = Dto
    const findProduct = await this.getById(id, false)
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
        category_id: +categoryId,
        user_id: +userId,
        description,
        count: +count,
        availability: Boolean(availability),
        parent_id: parentId,
        video_youtube_url: videoYoutubeUrl,
        url
      })

    if (!product) {
      throw ApiError.badRequest(
        'Продукт не обновлён',
        'ProductsService updateById')
    }

    const imgResult = await this.updatePictures(id, DtoFile, Dto, findProduct.result)
    const prices = await ProductsPriceService.updateProductPrice({
      id: findProduct.result.priceId,
      productId: id,
      priceTypeId,
      price
    })

    return {
      success: true,
      result: product,
      message: `Продукт с id ${id} успешно обновлён; ${imgResult}; ${prices.message}`
    }
  }

  async deleteById (id: number): Promise<IMessage> {
    const product = await ProductsModel.query()
      .deleteById(id)
    if (!product) {
      throw ApiError.badRequest(
        'Продукт не удалён',
        'ProductsService deleteById')
    }
    return {
      success: true,
      message: `Продукт с id ${id} успешно удалён`
    }
  }

  async getById (id: number, incView: boolean = true): Promise<IMessage> {
    if (incView) {
      await ProductsViewsService.incrementViewById(id)
    }
    const product = await ProductsModel.query()
      .findOne('products.id', '=', id)
      .innerJoin('products_views', 'products.id', '=', 'products_views.product_id')
      .innerJoin('products_price', 'products.id', '=', 'products_price.product_id')
      .innerJoin('prices_types', 'products_price.price_type_id', '=', 'prices_types.id')
      .select('products.*',
        'products_views.views as view',
        'products_price.price as price',
        'products_price.currency as priceCurrency',
        'products_price.id as priceId',
        'prices_types.name as priceType')
    if (!product) {
      throw ApiError.badRequest(
        `Продукта с id ${id} не существует`,
        'ProductsService getById')
    }
    return {
      success: true,
      result: product,
      message: `Продукт с id ${id} успешно получен`
    }
  }

  async getAll (limit: number = 20, page: number = 1): Promise<IMessage> {
    const result = await ProductsModel.query()
      .page(page - 1, limit)
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

  async search (title: string = '', limit: number = 20, page: number = 1): Promise<IMessage> {
    const result = await ProductsModel.query()
      .page(page - 1, limit)
      .where('title', 'like', `%${title}%`)
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
