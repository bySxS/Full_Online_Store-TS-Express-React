import { Router } from 'express'
import { RoleMiddleware } from '@/middleware/role'
// import { AuthMiddleware } from '@/middleware/auth'
import ApiError from '@/apiError'
import ProductsController from './products.controller'
import { validateId, validateLimitPage, validateSearch } from '@/validator'
import { validateProduct, validateProductUpd } from '@/products/products.validator'
import { ValidatorResultMiddleware } from '@/middleware/validatorResult'

const router = Router()

try {
  // success
  router.post('/',
    validateProduct(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    ProductsController.add)
  // success
  router.get('/',
    validateLimitPage(), ValidatorResultMiddleware,
    ProductsController.getAll)
  // success
  router.get('/dynamic_price/:id',
    validateId(), ValidatorResultMiddleware,
    ProductsController.getDynamicPriceByProductId)
  // success
  router.get('/search',
    validateSearch(), validateLimitPage(), ValidatorResultMiddleware,
    ProductsController.search)
  // success
  router.delete('/:id',
    validateId(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    ProductsController.deleteById)
  // success
  router.put('/:id',
    validateId(), validateProduct(), validateProductUpd(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    ProductsController.updateById)
  // success
  router.get('/:id',
    validateId(), ValidatorResultMiddleware,
    ProductsController.getById)
} catch (e) {
  throw ApiError.internalRequest('Ошибка в Products routers', 'ProductsRouter')
}

export default router
