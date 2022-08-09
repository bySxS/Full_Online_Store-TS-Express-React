export interface IReview {
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
  parent?: IReviewOut
  createdAt: Date
  updatedAt: Date
}
