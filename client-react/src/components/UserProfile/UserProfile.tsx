import React, { FC } from 'react'
import { IUsers } from 'store/myStore/myStoreUser.interface'

interface UserProfileProps {
  user: IUsers
}

const UserProfile: FC<UserProfileProps> = ({ user }) => {
  return (
    <div>
      {user.nickname}
    </div>
  )
}

export default UserProfile
