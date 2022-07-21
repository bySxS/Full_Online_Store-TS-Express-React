import { NextFunction, Request, Response } from 'express'
import { IJwt } from '@/users/token/token.interface'
import { IReviewController } from '@/review/review.interface'
import ReviewService from '@/review/review.service'

class ReviewController implements IReviewController {
  private static instance = new ReviewController()

  static getInstance (): ReviewController { // паттерн singleton одиночка
    if (!ReviewController.instance) {
      ReviewController.instance = new ReviewController()
    }
    return ReviewController.instance
  }

  async addReview (req: Request, res: Response, next: NextFunction) {
    try {
      const authUser = req.user as IJwt
      req.body.userId = authUser.id
      const result = await ReviewService.addReview(req.body)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async delReview (req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id
      const result =
        await ReviewService.delReview(id)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async getAllReviewByProductId (req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id
      const limit = +(req.query.limit || 20)
      const page = +(req.query.page || 1)
      const result =
        await ReviewService.getAllReviewByProductId(id, limit, page)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async getAllReviewByUserId (req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id
      const limit = +(req.query.limit || 20)
      const page = +(req.query.page || 1)
      const result =
        await ReviewService.getAllReviewByUserId(id, limit, page)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async getAllReviewByAuthUser (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const limit = +(req.query.limit || 20)
      const page = +(req.query.page || 1)
      const authUser = req.user as IJwt
      const result =
        await ReviewService.getAllReviewByUserId(authUser.id, limit, page)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}

export default ReviewController.getInstance()
