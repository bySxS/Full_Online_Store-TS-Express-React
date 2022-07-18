import { IProduct, IProductFilesArray, IProductService } from './products.interface'
import { IMessage } from '../interface'
import path from 'path'
import ProductsModel from './products.model'
import ApiError from '../apiError'
import fs from 'fs-extra'

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

  async updatePictures (id: number, DtoFile: IProductFilesArray): Promise<string> {
    if (!id || isNaN(id)) {
      throw ApiError.badRequest(
        'ID продукта не верный, для обновления изображений',
        'ProductsService updatePictures')
    }
    const {
      screen, image1, image2, image3,
      image4, image5, image6, image7,
      image8, image9, image10
    } = DtoFile

    const numberDir = div(id, 100)
    const pathDir = path.resolve(__dirname, '../..', 'static/products_pic', String(numberDir))
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
    let splitName = ['']
    let extension = ''
    fs.mkdirsSync(pathDir)
    if (screen) {
      splitName = screen.name.split('.')
      extension = splitName[splitName.length - 1] || 'jpg'
      fileNameScreen = `${id}_screen.${extension}`
      await screen.mv(pathDir + '/' + fileNameScreen)
    }
    if (image1) {
      splitName = image1.name.split('.')
      extension = splitName[splitName.length - 1] || 'jpg'
      fileNameImage1 = `${id}_image1.${extension}`
      await image1.mv(pathDir + '/' + fileNameImage1)
    }
    if (image2) {
      splitName = image2.name.split('.')
      extension = splitName[splitName.length - 1] || 'jpg'
      fileNameImage2 = `${id}_image2.${extension}`
      await image2.mv(pathDir + '/' + fileNameImage2)
    }
    if (image3) {
      splitName = image3.name.split('.')
      extension = splitName[splitName.length - 1] || 'jpg'
      fileNameImage3 = `${id}_image3.${extension}`
      await image3.mv(pathDir + '/' + fileNameImage3)
    }
    if (image4) {
      splitName = image4.name.split('.')
      extension = splitName[splitName.length - 1] || 'jpg'
      fileNameImage4 = `${id}_image4.${extension}`
      await image4.mv(pathDir + '/' + fileNameImage4)
    }
    if (image5) {
      splitName = image5.name.split('.')
      extension = splitName[splitName.length - 1] || 'jpg'
      fileNameImage5 = `${id}_image5.${extension}`
      await image5.mv(pathDir + '/' + fileNameImage5)
    }
    if (image6) {
      splitName = image6.name.split('.')
      extension = splitName[splitName.length - 1] || 'jpg'
      fileNameImage6 = `${id}_image6.${extension}`
      await image6.mv(pathDir + '/' + fileNameImage6)
    }
    if (image7) {
      splitName = image7.name.split('.')
      extension = splitName[splitName.length - 1] || 'jpg'
      fileNameImage7 = `${id}_image7.${extension}`
      await image7.mv(pathDir + '/' + fileNameImage7)
    }
    if (image8) {
      splitName = image8.name.split('.')
      extension = splitName[splitName.length - 1] || 'jpg'
      fileNameImage8 = `${id}_image8.${extension}`
      await image8.mv(pathDir + '/' + fileNameImage8)
    }
    if (image9) {
      splitName = image9.name.split('.')
      extension = splitName[splitName.length - 1] || 'jpg'
      fileNameImage9 = `${id}_image9.${extension}`
      await image9.mv(pathDir + '/' + fileNameImage9)
    }
    if (image10) {
      splitName = image10.name.split('.')
      extension = splitName[splitName.length - 1] || 'jpg'
      fileNameImage10 = `${id}_image10.${extension}`
      await image10.mv(pathDir + '/' + fileNameImage10)
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
      title, categoryId, userId,
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
    console.log(product)
    const imgResult = await this.updatePictures(product.id, DtoFile)

    return {
      success: true,
      result: product,
      message: `Продукт с id ${product.id} успешно добавлен и ${imgResult}`
    }
  }

  async updateById (id: number, Dto: IProduct, DtoFile: IProductFilesArray): Promise<IMessage> {
    const {
      title, categoryId, userId,
      description, count, availability,
      parentId, videoYoutubeUrl, url
    } = Dto
    const findProduct = await ProductsModel.query()
      .findOne({ id })
      .select('title')
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

    const imgResult = await this.updatePictures(id, DtoFile)

    return {
      success: true,
      result: product,
      message: `Продукт с id ${id} успешно обновлён и ${imgResult}`
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

  async getById (id: number): Promise<IMessage> {
    const product = await ProductsModel.query()
      .findOne({ id })
      .select('*')
    if (!product) {
      throw ApiError.badRequest(
        'Продукт не получен',
        'ProductsService getById')
    }
    return {
      success: true,
      result: product,
      message: `Продукт с id ${id} успешно получен`
    }
  }

  async getAll (limit: number = 10, page: number = 1): Promise<IMessage> {
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

  async search (title: string = '', limit: number = 10, page: number = 1): Promise<IMessage> {
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
