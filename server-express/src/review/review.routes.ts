import { Router } from 'express'
import { RoleMiddleware } from '@/middleware/role'
import { AuthMiddleware } from '@/middleware/auth'
import ApiError from '@/apiError'
import ReviewController from '@/review/review.controller'

const router = Router()

try {
  router.post('/add', AuthMiddleware, ReviewController.addReview)
  router.delete('/:id', RoleMiddleware(['admin']), ReviewController.delReview)
  router.get('/product/:id', AuthMiddleware, ReviewController.getAllReviewByProductId)
  router.get('/user/:id', ReviewController.getAllReviewByUserId)
  router.get('/', ReviewController.getAllReviewByAuthUser)
} catch (e) {
  throw ApiError.internalRequest('Ошибка в Review routers', 'ReviewRouter')
}

export default router
