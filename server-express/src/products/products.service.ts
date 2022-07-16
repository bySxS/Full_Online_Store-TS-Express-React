import { IProduct, IProductFilesArray, IProductService } from './products.interface'
import { IMessage } from '../interface'
import path from 'path'
import ProductsModel from './products.model'
import ApiError from '../apiError'

class ProductsService implements IProductService {
  private static instance = new ProductsService()

  static getInstance (): ProductsService {
    if (!ProductsService.instance) {
      ProductsService.instance = new ProductsService()
    }
    return ProductsService.instance
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
    const {
      screen, image1, image2, image3,
      image4, image5, image6, image7,
      image8, image9, image10
    } = DtoFile

    const pageDir = path.resolve(__dirname, '../..', 'static/products_pic')

    await screen.mv(pageDir)
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
