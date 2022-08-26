import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import selectUser from 'store/user/user.selector'

export const useAuth = () => {
  const user = useSelector(selectUser.currentUser)
  const roles = useSelector(selectUser.currentRoles)
  const isActivated = useSelector(selectUser.userIsActivated)
  const nickname = useSelector(selectUser.nickname)
  const avatarUrl = useSelector(selectUser.avatarUrl)
  const isAuth = useSelector(selectUser.isAuth)
  const isUser = useSelector(selectUser.isUser)
  const isModer = useSelector(selectUser.isModer)
  const isAdmin = useSelector(selectUser.isAdmin)
  const myId = useSelector(selectUser.myId)

  return useMemo(() => ({
    user,
    roles,
    isActivated,
    nickname,
    avatarUrl,
    isAuth,
    isUser,
    isModer,
    isAdmin,
    myId
  }), [
    user, roles, isActivated, nickname, avatarUrl,
    isAuth, isUser, isModer, isAdmin, myId
  ])
}
