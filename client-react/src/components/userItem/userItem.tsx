import React, { FC } from 'react'
import { UserItemProps } from './UserItem.interface'

const UserItem: FC<UserItemProps> = ({ user }) => {
  return (
    <div>
      {user.nickname}
    </div>
  )
}

export default UserItem
