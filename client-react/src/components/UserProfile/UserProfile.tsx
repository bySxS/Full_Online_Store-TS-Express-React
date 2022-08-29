import React, { FC, useEffect, useState } from 'react'
import { IUsers } from 'store/myStore/myStoreUser.interface'
import { addHostServerToFileLink } from '../../utils'
import UserProfileEdit from '../UserProfileEdit/UserProfileEdit'

interface UserProfileProps {
  user: IUsers
  notShowInfo?: boolean
}

const UserProfile: FC<UserProfileProps> = ({
  user,
  notShowInfo = false
}) => {
  const [currentUser, setCurrentUser] = useState<IUsers>({
    ...user,
    avatar: (user.avatar.includes('//')
      ? user.avatar
      : addHostServerToFileLink(user.avatar, user.id, 'user_avatar')
    )
  })
  useEffect(() => {
    setCurrentUser({
      ...user,
      avatar: (user.avatar.includes('//')
        ? user.avatar
        : addHostServerToFileLink(user.avatar, user.id, 'user_avatar')
      )
    })
  }, [user])
  return (
    <>
      <UserProfileEdit
        user={currentUser}
        edit={false}
        notShowInfo={notShowInfo}
      />
    </>
  )
}

export default UserProfile
