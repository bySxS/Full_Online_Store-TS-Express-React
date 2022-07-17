import { IMessage } from '../interface'
import { NextFunction, Request, Response } from 'express'

export interface IUsers {
    id: number,
    nickname: string,
    fullName?: string,
    city?: string,
    address?: string,
    deliveryAddress?: string,
    phoneNumber?: string,
    rolesId?: number,
    email: string,
    password: string
}

export interface IUserController {
    registration: (req: Request, res: Response,
                   next: NextFunction) => void
    login: (req: Request, res: Response,
            next: NextFunction) => void
    logout: (req: Request, res: Response,
             next: NextFunction) => void
    refresh: (req: Request, res: Response,
              next: NextFunction) => void
    activate: (req: Request, res: Response,
               next: NextFunction) => void
    updateUserById: (req: Request, res: Response,
                     next: NextFunction) => void
    getUsers: (req: Request, res: Response,
               next: NextFunction) => void
    getUserById: (req: Request, res: Response,
                  next: NextFunction) => void
    deleteUserById: (req: Request, res: Response,
                     next: NextFunction) => void
    searchUsers: (req: Request, res: Response,
                  next: NextFunction) => void
}

export interface IUserService {
    registration: (Dto: IUsers, ip: string,
                   fingerprint: string) => Promise<IMessage>
    login: (Dto: IUsers, ip: string,
            fingerprint: string) => Promise<IMessage>
    logout: (refreshToken: string) => Promise<IMessage>
    refresh: (refreshToken: string, ip: string,
              fingerprint: string) => Promise<IMessage>
    activate: (activateLink: string) => Promise<IMessage>
    getUserByNickname: (nickname: string) => Promise<IMessage>
    getUserById: (id: number) => Promise<IMessage>
    updateUserById: (id: number, bodyDto: IUsers,
                     rolesIdAuthUser: number) => Promise<IMessage>
    deleteUserById: (id: number) => Promise<IMessage>
    getUsers: (limit: number, page: number) => Promise<IMessage>
    searchUsers: (nickname: string, limit: number,
                  page: number) => Promise<IMessage>
}
