import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { AppDispatch, RootState } from 'store'
import { bindActionCreators } from '@reduxjs/toolkit'
import { basketAction } from 'store/reducers/basket.slice'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppActions = () => {
  const dispatch = useDispatch()
  const actions = { ...basketAction }
  return bindActionCreators(actions, dispatch)
}
