import { RootState } from '../index'

export const currentUser = (state: RootState) => state.user.user
export const nickname = (state: RootState) => state.user.user?.nickname ?? 'Гость'
export const avatarUrl = (state: RootState) => state.user.user?.avatar
export const userIsActivated = (state: RootState) => state.user.user?.isActivated === 1
export const currentRoles = (state: RootState) => state.user.user?.rolesName ?? 'Гость'
export const isAdmin = (state: RootState) => state.user.user?.rolesName === 'admin'
export const isModer = (state: RootState) => state.user.user?.rolesName === 'moder'
export const isUser = (state: RootState) => state.user.user?.rolesName === 'user'
export const isAuth = (state: RootState) => state.user.isAuth

const selectUser = {
  currentUser,
  nickname,
  avatarUrl,
  userIsActivated,
  currentRoles,
  isAdmin,
  isModer,
  isUser,
  isAuth
}

export default selectUser
