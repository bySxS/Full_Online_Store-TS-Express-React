import { Router } from 'express'
import UsersRoutes from './users/users.routes'
import RolesRoutes from './users/roles/roles.routes'
import ProductsRoutes from './products/products.routes'
const router = Router()

router.use('/user/roles', RolesRoutes)
router.use('/user', UsersRoutes)
router.use('/product', ProductsRoutes)

export default router
