import { createContext, Dispatch, SetStateAction, useContext } from 'react'

interface IRatingContext {
  rating?: number
  setRating?: Dispatch<SetStateAction<number>>
}

export const RatingContext =
  createContext<IRatingContext>({})

export default RatingContext

export const useRating = () => useContext(RatingContext)
