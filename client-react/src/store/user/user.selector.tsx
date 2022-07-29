import { RootState } from 'store/index'

export const currentUser = (state: RootState) => state.user.user

export const currentRoles = (state: RootState) => state.user.user?.rolesName ?? 'Гость'

export const isAuth = (state: RootState) => state.user.isAuth
