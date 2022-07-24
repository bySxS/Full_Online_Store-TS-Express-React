export interface IUsers {
  id: number
  nickname: string
  full_name: string
  city: string
  address: string
  delivery_address?: any
  phone_number?: any
  roles_id: number
  email: string
  password: string
  isActivated: number
  activateLink: string
  registration_Ip: string
  created_at: Date
  updated_at: Date
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
