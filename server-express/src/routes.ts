import { Router } from 'express'
import UsersRoutes from './users/users.routes'
import RolesRoutes from './users/roles/roles.routes'
const router = Router()

router.use('/user/roles', RolesRoutes)
router.use('/user', UsersRoutes)

export default router
