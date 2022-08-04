import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { AppDispatch, RootState } from 'store'
import { bindActionCreators } from '@reduxjs/toolkit'
import { basketAction } from 'store/basket/basket.slice'
import { alertAction } from 'store/alert/alert.slice'
import { userAction } from 'store/user/user.slice'
import { productAction } from 'store/product/product.slice'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppActions = () => {
  const dispatch = useDispatch()
  const actions = {
    ...basketAction,
    ...alertAction,
    ...userAction,
    ...productAction
  }
  return bindActionCreators(actions, dispatch)
}
