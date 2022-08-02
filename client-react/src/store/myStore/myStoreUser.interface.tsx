export interface IUsers {
  id: number
  nickname: string
  fullName?: string
  city?: string
  address?: string
  deliveryAddress?: string
  phoneNumber?: string
  rolesId: number
  email: string
  password: string
  isActivated: number
  isSubscribeToNews: number
  avatar: string
  activateLink: string
  registrationIp: string
  createdAt: Date
  updatedAt: Date
}

export interface IUser {
  id: number
  nickname: string
  fullName: string
  city: string
  address: string
  deliveryAddress?: string
  phoneNumber?: string
  rolesId: number
  email: string
  password: string
  isActivated: number
  isSubscribeToNews: number
  avatar: string
  activateLink: string
  registrationIp: string
  createdAt: Date
  updatedAt: Date
  rolesName: string
}

export interface IToken {
  accessToken: string
  refreshToken: string
}

export interface ILoginIn {
  nickname: string
  password: string
}

export interface IRegistrationIn {
  nickname: string
  password: string
  email: string
  fullName?: string
  city?: string
  address?: string
  deliveryAddress?: string
  phoneNumber?: string
  isSubscribeToNews?: boolean
  avatar?: File | null
}

export interface ILoginResult {
  token: IToken
  user: IUser
}
