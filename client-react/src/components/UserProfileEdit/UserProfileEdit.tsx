import React, { FC } from 'react'
import { IUsers } from 'store/myStore/myStoreUser.interface'

interface UserProfileProps {
  user: IUsers
}

const UserProfileEdit: FC<UserProfileProps> = ({ user }) => {
  return (
    <div>
      Радачим акк {user.nickname}
    </div>
  )
}

export default UserProfileEdit
