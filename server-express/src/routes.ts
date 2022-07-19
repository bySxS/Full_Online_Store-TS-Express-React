import { Router } from 'express'
import UsersRoutes from './users/users.routes'
import RolesRoutes from './users/roles/roles.routes'
import ProductsRoutes from './products/products.routes'
import ProductsPriceRoutes from './products/prices/productsPrice.routes'
const router = Router()

router.use('/user/roles', RolesRoutes)
router.use('/user', UsersRoutes)
router.use('/product/prices', ProductsPriceRoutes)
router.use('/product', ProductsRoutes)

export default router
