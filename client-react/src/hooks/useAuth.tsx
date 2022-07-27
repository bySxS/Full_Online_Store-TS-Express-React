import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { currentUser } from 'store/user/user.selector'

export const useAuth = () => {
  const user = useSelector(currentUser)

  return useMemo(() => ({ user }), [user])
}
