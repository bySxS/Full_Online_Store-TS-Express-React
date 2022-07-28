import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { currentUser, isAuth } from 'store/user/user.selector'

export const useAuth = () => {
  const user = useSelector(currentUser)
  const auth = useSelector(isAuth)

  return useMemo(() => ({ user, auth }), [user, auth])
}
