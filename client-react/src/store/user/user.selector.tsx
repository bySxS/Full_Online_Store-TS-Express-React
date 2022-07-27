import { RootState } from 'store/index'

export const currentUser = (state: RootState) => state.user.user

export const isAuth = (state: RootState) => state.user.isAuth
