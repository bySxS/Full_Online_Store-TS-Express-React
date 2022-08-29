import { IMessage } from '@/interface'
import { NextFunction, Request, Response } from 'express'
import { FileArray, UploadedFile } from 'express-fileupload'
import ProductsModel from './products.model'
import { Page, QueryBuilder } from 'objection'
import CharacteristicsSetValueModel from '@/characteristics/characteristicsSetValue.model'

export type TSort = 'price_asc' | 'price_desc' |
  'id_desc' | 'views_desc' | 'rating_desc' | 'favorites_desc' | ''


export interface IGetProducts {
  filter?: string[],
  price?: number[],
  sort?: TSort,
  limit?: number,
  page?: number
  categoryId?: number
  userId?: number
}

export interface IProduct {
  id: number,
  title: string,
  categoryId: number,
  userId: number,
  description: string
  count: number
  price: number
  priceTypeId: number
  availability: boolean
  screen: string
  image1?: string
  image2?: string
  image3?: string
  image4?: string
  image5?: string
  image6?: string
  image7?: string
  image8?: string
  image9?: string
  image10?: string
  delScreen?: boolean
  delImage1?: boolean
  delImage2?: boolean
  delImage3?: boolean
  delImage4?: boolean
  delImage5?: boolean
  delImage6?: boolean
  delImage7?: boolean
  delImage8?: boolean
  delImage9?: boolean
  delImage10?: boolean
  videoYoutubeUrl?: string
  parentId?: number
  url?: string
}

export interface IProductFilesArray extends FileArray {
  screen: UploadedFile
  image1: UploadedFile
  image2: UploadedFile
  image3: UploadedFile
  image4: UploadedFile
  image5: UploadedFile
  image6: UploadedFile
  image7: UploadedFile
  image8: UploadedFile
  image9: UploadedFile
  image10: UploadedFile
}

export interface IProductService {
  updatePictures: (
    id: number, DtoFile: IProductFilesArray | null,
    Dto: IProduct, findProduct: ProductsModel | undefined
  ) => Promise<IMessage>
  add: (Dto: IProduct, DtoFile: IProductFilesArray) => Promise<IMessage>
  updateById: (
    id: number, Dto: IProduct, DtoFile: IProductFilesArray
  ) => Promise<IMessage>
  deleteById: (id: number) => Promise<IMessage>
  getById: (id: number, incView: boolean) => Promise<IMessage>
  getAll: (args: IGetProducts) => Promise<IMessage>
  search: (title: string, limit: number,
           page: number) => Promise<IMessage>
  getAllProductsWithFilter: (args: {
    limit?: number,
    page?: number,
    filter?: string[],
    price?: number[],
    sort?: TSort
}) =>
    QueryBuilder<ProductsModel, ProductsModel | undefined> |
    QueryBuilder<ProductsModel, Page<ProductsModel>>
  getGeneralCharacteristicsForProducts: (
      productsIds: number[]
  ) => QueryBuilder<CharacteristicsSetValueModel, CharacteristicsSetValueModel[]>
  sortAndAddCharacteristicsToProducts: (
    products: ProductsModel | Page<ProductsModel>
  ) => Promise<ProductsModel | Page<ProductsModel>>
  getDynamicPriceByProductId: (productId: number) => Promise<IMessage>
}

export interface IProductController {
  add: (req: Request, res: Response,
        next: NextFunction) => void
  updateById: (req: Request, res: Response,
        next: NextFunction) => void
  deleteById: (req: Request, res: Response,
        next: NextFunction) => void
  getById: (req: Request, res: Response,
        next: NextFunction) => void
  getAll: (req: Request, res: Response,
        next: NextFunction) => void
  search: (req: Request, res: Response,
        next: NextFunction) => void
  getDynamicPriceByProductId: (req: Request, res: Response,
                               next: NextFunction) => void
}
