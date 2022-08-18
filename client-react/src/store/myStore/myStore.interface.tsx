export interface IResultList<T> {
  results: T[]
  total: number
  page: number
  limit: number
}

export interface IMessage<T> {
  message: string
  result: T
  success: boolean
}
