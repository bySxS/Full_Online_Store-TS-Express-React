import { IMessage } from '../interface'
import { NextFunction, Request, Response } from 'express'
import { FileArray, UploadedFile } from 'express-fileupload'
import ProductsModel from './products.model'

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
}

export interface IProductService {
  delPicture: (delPic: boolean, fileName: string, pathDir: string) => Promise<string>
  savePicture: (id: number, pathDir: string, file: UploadedFile, fileName: string, fileName2: string) => Promise<string>
  updatePictures: (id: number, DtoFile: IProductFilesArray, Dto: IProduct, findProduct: ProductsModel | null) => Promise<string>
  add: (Dto: IProduct, DtoFile: IProductFilesArray) => Promise<IMessage>
  updateById: (id: number, Dto: IProduct, DtoFile: IProductFilesArray) => Promise<IMessage>
  deleteById: (id: number) => Promise<IMessage>
  getById: (id: number, incView: boolean) => Promise<IMessage>
  getAll: (limit: number, page: number) => Promise<IMessage>
  search: (title: string, limit: number,
                page: number) => Promise<IMessage>
}
