import { NextFunction, Request, Response } from 'express'
import RolesService from './roles.service'
import { IRolesController } from './roles.interface'

class RolesController implements IRolesController {
  private static instance = new RolesController()

  static getInstance (): RolesController {
    if (!RolesController.instance) {
      RolesController.instance = new RolesController()
    }
    return RolesController.instance
  }

  async AddRole (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await RolesService.AddRole(req.body)
      res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }
}

export default RolesController.getInstance()
