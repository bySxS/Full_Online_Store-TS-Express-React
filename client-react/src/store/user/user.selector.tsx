import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../index'

const currentUser = (state: RootState) => state.user.user
const isAuth = (state: RootState) => state.user.isAuth
const menuShow = (state: RootState) => state.user.menuShow
const nickname = createSelector(currentUser, isAuth, (item, item2) => (item2 && item2 === true && item?.nickname) || 'Гость')
const avatarUrl = createSelector(currentUser, isAuth, (item, item2) => (item2 && item2 === true && item?.avatar) || '')
const userIsActivated = createSelector(currentUser, isAuth, (item, item2) => (item2 && item2 === true && item?.isActivated) === 1)
const currentRoles = createSelector(currentUser, isAuth, (item, item2) => (item2 && item2 === true && item?.rolesName) || 'Гость')
const isAdmin = createSelector(currentUser, isAuth, (item, item2) => (item2 && item2 === true && item?.rolesId === 1) || false)
const isModer = createSelector(currentUser, isAuth, (item, item2) => (item2 && item2 === true && item?.rolesId === 2) || false)
const isUser = createSelector(currentUser, isAuth, (item, item2) => (item2 && item2 === true && item?.rolesId === 3) || false)
const rolesId = createSelector(currentUser, isAuth, (item, item2) => (item2 && item2 === true && item?.rolesId) || 0)
const myId = createSelector(currentUser, isAuth, (item, item2) => (item2 && item2 === true && item?.id) || 0)

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
