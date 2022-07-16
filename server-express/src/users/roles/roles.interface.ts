import { IMessage } from '../../interface'
import { NextFunction, Request, Response } from 'express'

export interface IRoles {
    id: number,
    rolesId?: number,
    name: string,
    nameEng: string,
}

export interface IRolesController {
    AddRole: (req: Request, res: Response, next: NextFunction) => void
}

export interface IRolesService {
    AddRole: (Dto: IRoles) => Promise<IMessage>,
    getRoleById: (id: number) => Promise<IMessage>,
    getRoles: () => Promise<IMessage>,
}
