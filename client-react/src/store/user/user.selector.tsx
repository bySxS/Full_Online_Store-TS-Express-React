import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../index'

const currentUser = (state: RootState) => state.user.user
const nickname = createSelector(currentUser, item => item?.nickname ?? 'Гость')
const avatarUrl = createSelector(currentUser, item => item?.avatar || '')
const userIsActivated = createSelector(currentUser, item => item?.isActivated === 1)
const currentRoles = createSelector(currentUser, item => item?.rolesName ?? 'Гость')
const isAdmin = createSelector(currentUser, item => item?.rolesId === 1)
const isModer = createSelector(currentUser, item => item?.rolesId === 2)
const isUser = createSelector(currentUser, item => item?.rolesId === 3)
const rolesId = createSelector(currentUser, item => item?.rolesId ?? 0)
const isAuth = (state: RootState) => state.user.isAuth
const myId = createSelector(currentUser, item => item?.id || 0)
const menuShow = (state: RootState) => state.user.menuShow

const selectUser = {
  currentUser,
  nickname,
  avatarUrl,
  userIsActivated,
  currentRoles,
  rolesId,
  isAdmin,
  isModer,
  isUser,
  isAuth,
  myId,
  menuShow
}

export default selectUser
