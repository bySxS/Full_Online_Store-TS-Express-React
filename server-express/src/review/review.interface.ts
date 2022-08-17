import { NextFunction, Request, Response } from 'express'
import { IMessage } from '@/interface'
import ReviewModel from '@/review/review.model'

export interface IReview {
  id?: number
  productId: number
  userId: number
  comment: string
  advantages?: string
  flaws?: string
  bought?: boolean
  rating?: number
  parentId?: number
  child?: IReview[]
}

export interface IReviewService {
  addReview: (Dto: IReview) => Promise<IMessage>
  updRating: (Dto: IReview) => Promise<IMessage>
  delReview: (id: number) => Promise<IMessage>
  getAllReviewByProductId: (productId: number, limit: number, page: number) => Promise<IMessage>
  getAllReviewByUserId: (userId: number, limit: number, page: number) => Promise<IMessage>
  recursFind: (reviews: IReview[], review: IReview) => IReview[]
  sortReviewTree: (reviews: ReviewModel[]) => IReview[]
}

export interface IReviewController {
  addReview: (req: Request, res: Response, next: NextFunction) => void
  updRating: (req: Request, res: Response, next: NextFunction) => void
  delReview: (req: Request, res: Response, next: NextFunction) => void
  getAllReviewByProductId: (req: Request, res: Response, next: NextFunction) => void
  getAllReviewByUserId: (req: Request, res: Response, next: NextFunction) => void
  getAllReviewByAuthUser: (req: Request, res: Response, next: NextFunction) => void
}
