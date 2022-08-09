import { IMessage } from '@/interface'
import { NextFunction, Request, Response } from 'express'

export interface ICategory {
  id?: number
  name: string
  nameEng: string
  parentId?: number
}

export interface ICategoryOut {
  categoryId: number
  categoryName: string
  categoryNameEng: string
  categoryCountProducts: number
}

export interface ISectionOut {
  sectionId: number
  sectionName: string
  sectionNameEng: string
  sectionCountProducts: number
  category: ICategoryOut[]
}

export interface ICategoryService {
  add: (Dto: ICategory) => Promise<IMessage>
  upd: (id: number, Dto: ICategory) => Promise<IMessage>
  del: (id: number) => Promise<IMessage>
  getAll: () => Promise<IMessage>
  search: (name: string, limit: number, page: number) => Promise<IMessage>
}

export interface ICategoryController {
  add: (req: Request, res: Response, next: NextFunction) => void
  upd: (req: Request, res: Response, next: NextFunction) => void
  del: (req: Request, res: Response, next: NextFunction) => void
  getAll: (req: Request, res: Response, next: NextFunction) => void
  search: (req: Request, res: Response, next: NextFunction) => void
}
