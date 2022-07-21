import { Router } from 'express'
import { RoleMiddleware } from '@/middleware/role'
// import { AuthMiddleware } from 'middleware/auth'
import ApiError from '@/apiError'
import CharacteristicsController from './characteristics.controller'
import { validateId } from '@/validator'

const router = Router()

try {
  router.post('/value/add', RoleMiddleware(['admin']), CharacteristicsController.addCharacteristicValue)
  router.put('/value/:id', RoleMiddleware(['admin']), CharacteristicsController.updCharacteristicValueById)
  router.delete('/value/:id', validateId, RoleMiddleware(['admin']), CharacteristicsController.delCharacteristicValueById)
  router.post('/product/add', RoleMiddleware(['admin']), CharacteristicsController.addCharacteristicProduct)
  router.put('/product/:id', RoleMiddleware(['admin']), CharacteristicsController.updCharacteristicProductById)
  router.delete('/product/:id', RoleMiddleware(['admin']), CharacteristicsController.delCharacteristicProductById)
  router.get('/product/:id', CharacteristicsController.getCharacteristicProductById)
} catch (e) {
  throw ApiError.internalRequest('Ошибка в Characteristics routers', 'CharacteristicsRouter')
}

export default router
