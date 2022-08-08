import { Router } from 'express'
import { RoleMiddleware } from '@/middleware/role'
// import { AuthMiddleware } from 'middleware/auth'
import ApiError from '@/apiError'
import CharacteristicsController from './characteristics.controller'
import { validateId } from '@/validator'
import { ValidatorResultMiddleware } from '@/middleware/validatorResult'
import {
  validateCharacteristicAddName,
  validateCharacteristicSetValue
} from './characteristics.validator'

const router = Router()

try {
  // success
  router.post('/name',
    validateCharacteristicAddName(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    CharacteristicsController.addCharacteristicName)
  // success
  router.put('/name/:id',
    validateId(), validateCharacteristicAddName(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    CharacteristicsController.updCharacteristicNameById)
  // success
  router.delete('/name/:id',
    validateId(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    CharacteristicsController.delCharacteristicNameById)
  // success
  router.post('/value',
    validateCharacteristicSetValue(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    CharacteristicsController.addCharacteristicValueProduct)
  // success
  router.put('/value/:id',
    validateId(), validateCharacteristicSetValue(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    CharacteristicsController.updCharacteristicValueProductById)
  // success
  router.delete('/value/:id',
    validateId(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    CharacteristicsController.delCharacteristicValueProductById)
  // success
  router.get('/product/:id',
    validateId(), ValidatorResultMiddleware,
    CharacteristicsController.getCharacteristicValueProductById)
} catch (e) {
  throw ApiError.internalRequest(
    'Ошибка в Characteristics routers',
    'CharacteristicsRouter')
}

export default router
