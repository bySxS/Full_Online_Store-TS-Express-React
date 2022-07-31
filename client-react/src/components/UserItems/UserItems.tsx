import React, { FC } from 'react'
import { IUsers } from 'store/myStore/myStoreUser.interface'

interface UserItemProps {
  user: IUsers
}

const UserItems: FC<UserItemProps> = ({ user }) => {
  return (
    <div>
      {user.nickname}
    </div>
  )
}

export default UserItems
