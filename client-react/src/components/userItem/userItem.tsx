import React, { FC } from 'react'
import { UserItemProps } from 'types/props'

const UserItem: FC<UserItemProps> = ({ user }) => {
  return (
    <div>
      {user.nickname}
    </div>
  )
}

export default UserItem
