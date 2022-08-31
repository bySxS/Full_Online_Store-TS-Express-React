export interface IResultList<T> {
  results: T[]
  total: number
  totalPage: number
  page: number
  limit: number
}

export interface IMessage<T> {
  message: string
  result: T
  success: boolean
}
