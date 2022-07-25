import { IMessage } from '@/interface'

export interface IToken {
  accessToken: string
  refreshToken: string
}

export interface IJwt {
  id: number,
  nickname: string,
  rolesId: number,
  rolesName: string
}

export interface IDtoToken {
  userId: number,
  refreshToken: string,
  ip: string,
  fingerprint: string
}

export interface ITokenService {
  generateTokens: (id: number,
                   nickname: string,
                   rolesId: number,
                   rolesName: string) => IToken
  validateAccessToken: (token: string) => IJwt | null
  validateRefreshToken: (token: string) => IJwt | null
  saveToken: (payload: IDtoToken) => Promise<IMessage>
  removeToken: (refreshToken: string) => Promise<IMessage>
  findToken: (refreshToken: string) => Promise<IMessage>
}
