import { IMessage } from '@/interface'
import { NextFunction, Request, Response } from 'express'
import { FileArray, UploadedFile } from 'express-fileupload'
import UsersModel from '@/users/users.model'

export interface IUsers {
    id: number,
    nickname: string,
    fullName?: string,
    city?: string,
    address?: string,
    deliveryAddress?: string,
    phoneNumber?: string,
    rolesId?: number,
    isSubscribeToNews?: boolean
    delAvatar?: boolean
    email: string,
    password: string
}

export interface IUsersFilesArray extends FileArray {
    avatar: UploadedFile
}

export interface IUserService {
    updAvatar: (id: number, DtoFile: IUsersFilesArray | null, delAvatar: boolean, userFind: UsersModel | undefined) => Promise<string>
    registration: (Dto: IUsers, ip: string,
                   fingerprint: string, DtoFile: IUsersFilesArray) => Promise<IMessage>
    login: (Dto: IUsers, ip: string,
            fingerprint: string) => Promise<IMessage>
    logout: (refreshToken: string) => Promise<IMessage>
    refresh: (refreshToken: string, ip: string,
              fingerprint: string) => Promise<IMessage>
    activate: (activateLink: string) => Promise<IMessage>
    getUserByNickname: (nickname: string) => Promise<IMessage>
    getUserById: (id: number) => Promise<IMessage>
    updateUserById: (id: number, bodyDto: IUsers,
                     rolesIdAuthUser: number, DtoFile: IUsersFilesArray) => Promise<IMessage>
    deleteUserById: (id: number) => Promise<IMessage>
    getUsers: (limit: number, page: number) => Promise<IMessage>
    searchUsers: (nickname: string, limit: number,
                  page: number) => Promise<IMessage>
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
