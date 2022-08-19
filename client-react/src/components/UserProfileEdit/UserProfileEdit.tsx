import React, { FC, useState } from 'react'
import { Button } from 'react-bootstrap'
import { IUser } from 'store/myStore/myStoreUser.interface'
import Registration from '../Registration/Registration'
import style from './UserProfileEdit.module.scss'

interface UserProfileProps {
  user: IUser
}

const UserProfileEdit: FC<UserProfileProps> = ({ user }) => {
  const [showEditPass, setShowEditPass] = useState<boolean>(false)
  const [showEditAvatar, setShowEditAvatar] = useState<boolean>(false)

  const clickChangeAvatar = () => {
    setShowEditAvatar(prev => !prev)
  }

  const clickChangePass = () => {
    setShowEditPass(prev => !prev)
  }

  return (
    <div className={style.viewProfile}>
      <div className={style.sectionAvatar}>
        {user.avatar
          ? <img className={style.avatar}
                 alt={user.nickname}
                 src={user.avatar}
          />
          : <i className="bi bi-person-circle text-9xl text-gray-700"/>
        }
        <div className={style.button}>
          <Button
            onClick={clickChangeAvatar}
            variant="primary"
            className={'bg-emerald-600 w-full'}>
            {!showEditAvatar ? 'Изменить аватар' : 'Не изменять аватар'}
          </Button>
        </div>
        <div className={style.button}>
          <Button
            onClick={clickChangePass}
            variant="primary"
            className={'bg-emerald-600 w-full'}>
            {!showEditPass ? 'Изменить пароль' : 'Не изменять пароль'}
          </Button>
        </div>
      </div>
      <div className={style.sectionInfo}>
        <Registration
          changeProfile={true}
          defaultInfoUser={user}
          showDelAvatar={showEditAvatar}
          showEditAvatar={showEditAvatar}
          showEditPass={showEditPass}
        />
      </div>
    </div>
  )
}

export default UserProfileEdit
