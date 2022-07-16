import { Secret, sign, verify } from 'jsonwebtoken'
import { IMessage } from '../../interface'
import TokenModel from './token.model'
import { IDtoToken, IJwt, IToken, ITokenService } from './token.interface'
import ApiError from '../../apiError'

class TokenService implements ITokenService {
  private static instance = new TokenService()
  private ACCESS_SECRET: Secret = process.env.JWT_ACCESS_SECRET || ''
  private REFRESH_SECRET: Secret = process.env.JWT_REFRESH_SECRET || ''

  static getInstance (): TokenService { // singleton
    if (!TokenService.instance) {
      TokenService.instance = new TokenService()
    }
    return TokenService.instance
  }

  generateTokens (
    id: number,
    nickname: string,
    rolesId: number,
    rolesName: string): IToken {
    const payload: IJwt = { rolesId, rolesName, id, nickname }

    if (this.ACCESS_SECRET === '') {
      return { accessToken: '', refreshToken: '' }
    }
    const accessToken =
      sign(payload, this.ACCESS_SECRET, { expiresIn: '30m' })
    const refreshToken =
      sign(payload, this.REFRESH_SECRET, { expiresIn: '30d' })
    return { accessToken, refreshToken }
  }

  validateAccessToken (token: string): IJwt | null {
    try {
      return verify(token, this.ACCESS_SECRET) as IJwt
    } catch (e) {
      return null
    }
  }

  validateRefreshToken (token: string): IJwt | null {
    try {
      return verify(token, this.REFRESH_SECRET) as IJwt
    } catch (e) {
      return null
    }
  }

  async saveToken (payload: IDtoToken): Promise<IMessage> {
    const { userId, refreshToken, ip, fingerprint } = payload
    if (!refreshToken || refreshToken.length < 10) {
      throw ApiError.UnauthorizedError(
        'TokenService saveToken')
    }

    const tokenData = await TokenModel.query()
      .findOne('user_id', userId)
    if (!tokenData) {
      const result = await TokenModel.query()
        .insert({
          user_id: userId,
          refreshToken,
          fingerprint,
          ip
        })
      return {
        success: true,
        result,
        message: 'Токен создан'
      }
    }
    const result = await TokenModel.query()
      .where('user_id', userId)
      .update({ refreshToken })
    return {
      success: true,
      result,
      message: 'Токен обновлён'
    }
  }

  async removeToken (refreshToken: string): Promise<IMessage> {
    if (!refreshToken || refreshToken.length < 10) {
      throw ApiError.UnauthorizedError(
        'TokenService removeToken')
    }
    const tokenData = await TokenModel.query()
      .delete()
      .where({ refreshToken })
    return {
      success: true,
      result: tokenData,
      message: 'Токен успешно удалён'
    }
  }

  async findToken (refreshToken: string): Promise<IMessage> {
    if (!refreshToken || refreshToken.length < 10) {
      throw ApiError.UnauthorizedError(
        'TokenService removeToken')
    }
    const tokenData = await TokenModel.query()
      .findOne({ refreshToken })
    return {
      success: true,
      result: tokenData,
      message: 'Токен успешно удалён'
    }
  }
}

export default TokenService.getInstance()
