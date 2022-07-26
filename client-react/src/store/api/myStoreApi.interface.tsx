export interface IUsers {
  id: number
  nickname: string
  fullName: string
  city: string
  address: string
  deliveryAddress?: any
  phoneNumber?: any
  rolesId: number
  email: string
  password: string
  isActivated: number
  activateLink: string
  registrationIp: string
  createdAt: Date
  updatedAt: Date
}

export interface IResultList<T> {
  results: T[]
  total: number
}

export interface IMessage<T> {
  message: string
  result?: T
  success: boolean
}
