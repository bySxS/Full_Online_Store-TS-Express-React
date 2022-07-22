import { Router } from 'express'
import { RoleMiddleware } from '@/middleware/role'
// import { AuthMiddleware } from 'middleware/auth'
import ApiError from '@/apiError'
import ProductsPriceController from '../prices/productsPrice.controller'
import { validateId, validateLimitPage } from '@/validator'
import { ValidatorResultMiddleware } from '@/middleware/validatorResult'
import { validateTypePrice } from '@/products/prices/productsPrice.validator'

const router = Router()

try {
  // success
  router.post('/types/add',
    validateTypePrice(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    ProductsPriceController.addTypePrice)
  // success
  router.put('/types/:id',
    validateId(), validateTypePrice(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    ProductsPriceController.updateTypePriceById)
  // success
  router.delete('/types/:id',
    validateId(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    ProductsPriceController.delTypePriceById)
  // success
  router.get('/types',
    validateLimitPage(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    ProductsPriceController.getTypesPrices)
} catch (e) {
  throw ApiError.internalRequest('Ошибка в ProductsPrice routers', 'ProductsPriceRouter')
}

export default router
