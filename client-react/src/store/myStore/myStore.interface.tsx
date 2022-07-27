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

export interface IProduct {
  id: number
  title: string
  categoryId: number
  userId: number
  description: string
  count: number
  priceTypeId: number
  availability: number
  screen: string
  image1: string
  image2: string
  image3: string
  image4: string
  image5: string
  image6: string
  image7: string
  image8: string
  image9: string
  image10: string
  videoYoutubeUrl: string
  parentId?: number
  url: string
  createdAt: Date
  updatedAt: Date
  view: number
  priceId: number
  price: number
  priceCurrency: string
  priceType: string
  categoryName: string
  sectionName: string
  countInFavorites?: 6,
  parentProduct?: IProduct
}

export interface IResultList<T> {
  results: T[]
  total: number
}

export interface IMessage<T> {
  message: string
  result: T
  success: boolean
}

export interface ILoginIn {
  nickname: string
  password: string
}

export interface IToken {
  accessToken: string
  refreshToken: string
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

export interface ILoginResult {
  token: IToken
  user: IUser
}
