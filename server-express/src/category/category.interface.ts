import CategoryModel from '@/category/category.model'
import { IMessage } from '@/interface'
import { NextFunction, Request, Response } from 'express'

export interface ICategory {
  id?: number
  name: string
  nameEng: string
  iconClass?: string
  parentId?: number
}

export interface ICategoryOut {
  categoryId: number
  categoryName: string
  categoryNameEng: string
  categoryIconClass: string
  categoryCountProducts: number
  subcategory?: ICategoryOut[]
}

export interface ISectionOut {
  sectionId: number
  sectionName: string
  sectionNameEng: string
  sectionIconClass: string
  sectionCountProducts: number
  category: ICategoryOut[]
}

export interface ICategoryService {
  add: (Dto: ICategory) => Promise<IMessage>
  upd: (id: number, Dto: ICategory) => Promise<IMessage>
  del: (id: number) => Promise<IMessage>
  getAll: ({ sectionId, sort }: { sectionId?: number, sort?: boolean }) => Promise<IMessage>
  getAllCategoryBySectionWithCache: (sectionId?: number) => Promise<number[]>
  getAllParentByCategory: (categoryId?: number) => Promise<number[]>
  search: (name: string, limit: number, page: number) => Promise<IMessage>
  sortCategoryTree: (category: CategoryModel[]) => ISectionOut[]
}

export interface ICategoryController {
  add: (req: Request, res: Response, next: NextFunction) => void
  upd: (req: Request, res: Response, next: NextFunction) => void
  del: (req: Request, res: Response, next: NextFunction) => void
  getAll: (req: Request, res: Response, next: NextFunction) => void
  search: (req: Request, res: Response, next: NextFunction) => void
}
