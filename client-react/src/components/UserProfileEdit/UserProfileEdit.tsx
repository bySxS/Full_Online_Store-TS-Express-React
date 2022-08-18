import React, { FC } from 'react'
import { IUsers } from 'store/myStore/myStoreUser.interface'
import Registration from '../Registration/Registration'
import style from './UserProfileEdit.module.scss'

interface UserProfileProps {
  user: IUsers
}

const UserProfileEdit: FC<UserProfileProps> = ({ user }) => {
  return (
    <div className={style.viewProfile}>
      <div className={style.sectionAvatar}>
        {user.avatar
          ? <img className={style.avatar} src={user.avatar}/>
          : <i className="bi bi-person-circle text-5xl text-gray-700"/>
      }
      </div>
      <div className={style.sectionInfo}>
        <Registration changeProfile={true} defaultInfoUser={user} />
      </div>
    </div>
  )
}

export default UserProfileEdit
