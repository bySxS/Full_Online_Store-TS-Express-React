import { Router } from 'express'
import { RoleMiddleware } from '@/middleware/role'
import { AuthMiddleware } from '@/middleware/auth'
import ApiError from '@/apiError'
import ReviewController from '@/review/review.controller'
import { validateReview, validateUpdRating } from '@/review/review.validator'
import { validateId, validateLimitPage } from '@/validator'
import { ValidatorResultMiddleware } from '@/middleware/validatorResult'

const router = Router()

try {
  // success
  router.post('/',
    validateReview(), ValidatorResultMiddleware,
    AuthMiddleware,
    ReviewController.addReview)
  // success
  router.put('/',
    validateUpdRating(), ValidatorResultMiddleware,
    AuthMiddleware,
    ReviewController.updRating)
  // success
  router.get('/',
    validateLimitPage(), ValidatorResultMiddleware,
    AuthMiddleware,
    ReviewController.getAllReviewByAuthUser)
  // success
  router.get('/product/:id',
    validateId(), validateLimitPage(), ValidatorResultMiddleware,
    ReviewController.getAllReviewByProductId)
  // success
  router.get('/user/:id',
    validateId(), validateLimitPage(), ValidatorResultMiddleware,
    RoleMiddleware(['moder', 'admin']),
    ReviewController.getAllReviewByUserId)
  // success
  router.delete('/:id',
    validateId(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    ReviewController.delReview)
} catch (e) {
  throw ApiError.internalRequest(
    'Ошибка в Review routers', 'ReviewRouter'
  )
}

export default router
