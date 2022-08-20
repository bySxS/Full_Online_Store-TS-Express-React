import React, { FC, useState } from 'react'
import { IUsers } from 'store/myStore/myStoreUser.interface'
import { addHostServerToFileLink } from '../../utils'
import UserProfileEdit from '../UserProfileEdit/UserProfileEdit'

interface UserProfileProps {
  user: IUsers
}

const UserProfile: FC<UserProfileProps> = ({ user }) => {
  const [currentUser] = useState<IUsers>({
    ...user,
    avatar: (user.avatar.includes('//') ? user.avatar : addHostServerToFileLink(user.avatar, user.id, 'user_avatar'))
  })
  return (
    <>
      <UserProfileEdit user={currentUser} edit={false} />
    </>
  )
}

export default UserProfile
