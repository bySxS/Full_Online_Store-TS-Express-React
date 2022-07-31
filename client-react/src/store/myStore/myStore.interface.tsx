export interface IResultList<T> {
  results: T[]
  total: number
}

export interface IMessage<T> {
  message: string
  result: T
  success: boolean
}
