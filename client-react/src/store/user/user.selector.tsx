import { RootState } from '../index'

const currentUser = (state: RootState) => state.user.user
const nickname = (state: RootState) => state.user.user?.nickname ?? 'Гость'
const avatarUrl = (state: RootState) => state.user.user?.avatar
const userIsActivated = (state: RootState) => state.user.user?.isActivated === 1
const currentRoles = (state: RootState) => state.user.user?.rolesName ?? 'Гость'
const isAdmin = (state: RootState) => state.user.user?.rolesId === 1
const isModer = (state: RootState) => state.user.user?.rolesId === 2
const isUser = (state: RootState) => state.user.user?.rolesId === 3
const isAuth = (state: RootState) => state.user.isAuth
const myId = (state: RootState) => state.user.user?.id || 0
const menuShow = (state: RootState) => state.user.menuShow

const selectUser = {
  currentUser,
  nickname,
  avatarUrl,
  userIsActivated,
  currentRoles,
  isAdmin,
  isModer,
  isUser,
  isAuth,
  myId,
  menuShow
}

export default selectUser
