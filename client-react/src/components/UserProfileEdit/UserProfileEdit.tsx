import React, { FC, useState } from 'react'
import { Button } from 'react-bootstrap'
import { IUser, IUsers } from 'store/myStore/myStoreUser.interface'
import Registration from '../Registration/Registration'
import style from './UserProfileEdit.module.scss'

interface UserProfileProps {
  user: IUser | IUsers
  edit?: boolean
}

const UserProfileEdit: FC<UserProfileProps> = ({
  user,
  edit = true
}) => {
  const [editProfile, setEditProfile] = useState<boolean>(edit)
  const [showEditPass, setShowEditPass] = useState<boolean>(false)
  const [showEditAvatar, setShowEditAvatar] = useState<boolean>(false)

  const clickChangeAvatar = () => {
    setShowEditAvatar(prev => !prev)
  }

  const clickChangeProfile = () => {
    setEditProfile(prev => !prev)
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
        {!edit &&
         <div className={style.button}>
           <Button
             onClick={clickChangeProfile}
             variant="primary"
             className={'bg-emerald-600 w-full'}>
             {!editProfile ? 'Изменить профиль' : 'Не изменять профиль'}
           </Button>
         </div>
        }
        {editProfile &&
         <div className={style.button}>
           <Button
             onClick={clickChangeAvatar}
             variant="primary"
             className={'bg-emerald-600 w-full'}>
             {!showEditAvatar ? 'Изменить аватар' : 'Не изменять аватар'}
           </Button>
         </div>
        }
        {editProfile &&
         <div className={style.button}>
           <Button
             onClick={clickChangePass}
             variant="primary"
             className={'bg-emerald-600 w-full'}>
             {!showEditPass ? 'Изменить пароль' : 'Не изменять пароль'}
           </Button>
         </div>
        }
      </div>
      <div className={style.sectionInfo}>
        <Registration
          onlyShowInfo={!editProfile}
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