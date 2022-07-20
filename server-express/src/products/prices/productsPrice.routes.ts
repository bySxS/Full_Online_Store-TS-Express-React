import { Router } from 'express'
import { RoleMiddleware } from '@/middleware/role'
// import { AuthMiddleware } from 'middleware/auth'
import ApiError from '@/apiError'
import { validateId } from '@/users/users.validator'
import ProductsPriceController from '../prices/productsPrice.controller'

const router = Router()

try {
  router.get('/types/all', RoleMiddleware(['admin']), ProductsPriceController.getTypesPrices)
  router.post('/types/add', RoleMiddleware(['admin']), ProductsPriceController.addTypePrice)
  router.put('/types/:id', validateId, RoleMiddleware(['admin']), ProductsPriceController.updateTypePriceById)
  router.delete('/types/:id', RoleMiddleware(['admin']), ProductsPriceController.delTypePriceById)
} catch (e) {
  throw ApiError.internalRequest('Ошибка в ProductsPrice routers', 'ProductsPriceRouter')
}

export default router
