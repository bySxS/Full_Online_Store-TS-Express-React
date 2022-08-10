import { IReview, IReviewService } from '@/review/review.interface'
import { IMessage } from '@/interface'
import ApiError from '@/apiError'
import BasketService from '@/basket/basket.service'
import ReviewModel from '@/review/review.model'

class ReviewService implements IReviewService {
  private static instance = new ReviewService()

  static getInstance (): ReviewService {
    if (!ReviewService.instance) {
      ReviewService.instance = new ReviewService()
    }
    return ReviewService.instance
  }

  async addReview (Dto: IReview): Promise<IMessage> {
    const {
      productId, userId, comment,
      flaws, rating, parentId, advantages
    } = Dto
    const bought =
      await BasketService.isUserBoughtProduct(userId, productId)
    const result = await ReviewModel.query()
      .insert({
        productId,
        userId,
        comment,
        flaws,
        rating,
        bought,
        parentId,
        advantages
      })
      .select('*')
    if (!result) {
      throw ApiError.badRequest(
        'Ошибка при добавлении ' +
        (parentId ? 'комментария' : 'отзыва') + ' к продукту ' +
        `с id${productId}`,
        'ReviewService addReview')
    }
    return {
      success: true,
      result,
      message: (parentId ? 'Комментарий' : 'Отзыв') +
        ' успешно добавлен'
    }
  }

  async delReview (id: number): Promise<IMessage> {
    const result = await ReviewModel.query()
      .deleteById(id)
    if (!result) {
      throw ApiError.badRequest(
        `Ошибка удаления комментария с id${id}`,
        'ReviewService delReview')
    }
    return {
      success: true,
      result,
      message: `Комментарий с id${id} успешно удалён`
    }
  }

  recursFind (reviews: IReview[], review: IReview): IReview[] {
    const newReview = reviews
    newReview.forEach((value, i) => {
      if (value.id === review.parentId) {
        if (!value.child) { value.child = [] }
        value.child?.push(review)
        return newReview
      } else { // recurs
        if (value.child) {
          value.child = this.recursFind(value.child, review)
        }
      }
    })
    return newReview
  }

  sortReviewTree (reviews: ReviewModel[]): IReview[] {
    let newReview: IReview[] = []
    const parentId: number[] = []
    reviews.forEach(review => {
      (review.parentId) && parentId.push(review.parentId)
    })
    const parentIds = new Set(parentId.map(id => id))
    reviews.forEach((review) => {
      if (review.id) {
        if (!parentIds.has(review.parentId)) {
          newReview.push({ ...review, child: [] })
        } else {
          newReview = this.recursFind(newReview, review)
        }
      }
    })
    return newReview
  }

  async getAllReviewByProductId (
    productId: number, limit: number, page: number
  ): Promise<IMessage> {
    const query = () => {
      return ReviewModel.query()
        .where({ productId })
        .select('*')
        .orderBy(['id'])
    }
    let result
    if (limit === 0) {
      result = await query()
    } else {
      result = await query()
        .page(page - 1, limit)
    }
    if (!result) {
      return {
        success: true,
        message: `У продукта с id${productId} нет ` +
          'отзывов и комментариев'
      }
    }
    let reviews
    if ('results' in result) {
      reviews = result.results
    } else {
      reviews = this.sortReviewTree(result)
    }
    
    return {
      success: true,
      result: {
        total: ('total' in result ? result.total : reviews.length),
        results: reviews
      },
      message: `Страница ${page} отзывов продукта` +
        ` с id${productId} успешно загружена`
    }
  }

  async getAllReviewByUserId (
    userId: number, limit: number, page: number
  ): Promise<IMessage> {
    const result = await ReviewModel.query()
      .page(page - 1, limit)
      .where({ userId })
      .select('*')
    if (!result) {
      return {
        success: true,
        message: `У пользователя с id${userId} нет ` +
          'отзывов и комментариев'
      }
    }
    return {
      success: true,
      result,
      message: `Страница ${page} отзывов пользователя ` +
        `с id${userId} успешно загружена`
    }
  }
}

export default ReviewService.getInstance()
