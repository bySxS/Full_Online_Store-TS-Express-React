export interface IReview {
  id: number
  productId: number
  comment: string
  // недостатки
  flaws: string
  // плюсы
  advantages: string
  rating: number
  // ответить кому-то
  parentId: number
}

export interface IUpdRating {
  id?: number
  productId: number
  comment: string
  // недостатки
  flaws: string
  // плюсы
  advantages: string
  rating: number
}

export interface IReviewOut {
  id: number
  productId: number
  userId: number
  comment: string
  advantages: string
  flaws: string
  bought: number
  rating: number
  parentId?: number
  child?: IReviewOut[]
  createdAt: string
  updatedAt: string
  userNickname: string
  userAvatar: string
  userFullName: string
}
