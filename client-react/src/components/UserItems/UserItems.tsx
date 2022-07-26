import React, { FC } from 'react'
import { UserItemProps } from 'components/UserItems/UserItems.interface'

const UserItems: FC<UserItemProps> = ({ user }) => {
  return (
    <div>
      {user.nickname}
    </div>
  )
}

export default UserItems
