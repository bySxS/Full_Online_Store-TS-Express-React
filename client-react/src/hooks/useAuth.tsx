import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { currentUser, isAuth, currentRoles } from 'store/user/user.selector'

export const useAuth = () => {
  const user = useSelector(currentUser)
  const roles = useSelector(currentRoles)
  const auth = useSelector(isAuth)

  return useMemo(() => ({ user, auth, roles }), [user, auth, roles])
}
