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
    if (id && !isNaN(id)) {
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

    fs.mkdirsSync(pathDir)
    if (screen) {
      fileNameScreen = `${id}_screen.${screen.mimetype}`
      await screen.mv(pathDir + '/' + fileNameScreen)
    }
    if (image1) {
      fileNameImage1 = `${id}_image1.${screen.mimetype}`
      await image1.mv(pathDir + '/' + fileNameImage1)
    }
    if (image2) {
      fileNameImage2 = `${id}_image2.${screen.mimetype}`
      await image2.mv(pathDir + '/' + fileNameImage2)
    }
    if (image3) {
      fileNameImage3 = `${id}_image3.${screen.mimetype}`
      await image3.mv(pathDir + '/' + fileNameImage3)
    }
    if (image4) {
      fileNameImage4 = `${id}_image4.${screen.mimetype}`
      await image4.mv(pathDir + '/' + fileNameImage4)
    }
    if (image5) {
      fileNameImage5 = `${id}_image5.${screen.mimetype}`
      await image5.mv(pathDir + '/' + fileNameImage5)
    }
    if (image6) {
      fileNameImage6 = `${id}_image6.${screen.mimetype}`
      await image6.mv(pathDir + '/' + fileNameImage6)
    }
    if (image7) {
      fileNameImage7 = `${id}_image7.${screen.mimetype}`
      await image7.mv(pathDir + '/' + fileNameImage7)
    }
    if (image8) {
      fileNameImage8 = `${id}_image8.${screen.mimetype}`
      await image8.mv(pathDir + '/' + fileNameImage8)
    }
    if (image9) {
      fileNameImage9 = `${id}_image9.${screen.mimetype}`
      await image9.mv(pathDir + '/' + fileNameImage9)
    }
    if (image10) {
      fileNameImage10 = `${id}_image10.${screen.mimetype}`
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
        .findOne({ parentId })
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
        category_id: categoryId,
        user_id: userId,
        description,
        count,
        availability,
        parent_id: parentId,
        video_youtube_url: videoYoutubeUrl,
        url
      })

    if (!product) {
      throw ApiError.badRequest(
        'Продукт не добавлен',
        'ProductsService add')
    }

    return {
      success: true,
      result: product,
      message: 'Продукт успешно добавлен!'
    }
  }

  deleteById (id: number): Promise<IMessage> {
    return Promise.resolve(undefined)
  }

  getAll (limit: number, page: number): Promise<IMessage> {
    return Promise.resolve(undefined)
  }

  getById (id: number): Promise<IMessage> {
    return Promise.resolve(undefined)
  }

  search (title: string, limit: number, page: number): Promise<IMessage> {
    return Promise.resolve(undefined)
  }

  updateById (Dto: IProduct): Promise<IMessage> {
    return Promise.resolve(undefined)
  }
}

export default ProductsService.getInstance()
