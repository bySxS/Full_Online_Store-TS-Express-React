import React, { FC, useState } from 'react'
import { Button } from 'react-bootstrap'
import { IUser, IUsers } from 'store/myStore/myStoreUser.interface'
import { useAuth } from 'hooks/useSelectors'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useDeleteUserMutation } from 'store/myStore/myStoreUser.api'
import Registration from '../Registration/Registration'
import style from './UserProfileEdit.module.scss'

interface UserProfileProps {
  user: IUser | IUsers
  edit?: boolean
  notShowInfo?: boolean
}

const UserProfileEdit: FC<UserProfileProps> = ({
  user,
  edit = true,
  notShowInfo = false
}) => {
  const { isAdmin, nickname } = useAuth()
  const [deleteUser, {
    isSuccess, isError, isLoading, error, data
  }] = useDeleteUserMutation()
  useInfoLoading({
    isLoading, isSuccess, isError, data, error
  })
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

  const clickDeleteProfile = () => {
    const result = confirm('Вы уверены что хотите удалить пользователя ' + user.nickname + '?')
    if (result) {
      deleteUser(user.id)
    }
  }

  return (
    <div className={style.viewProfile}>
      <div className={`${style.sectionAvatar} ${(!notShowInfo || editProfile) ? 'pt-20' : ''}`}>
        {user.avatar
          ? <img className={style.avatar}
                 alt={user.nickname}
                 title={user.nickname}
                 src={user.avatar}
                 loading={'lazy'}
          />
          : <i className="bi bi-person-circle text-9xl text-gray-700"/>
        }
        {!edit &&
         <div className={style.button}>
           <Button
             onClick={clickChangeProfile}
             variant="success"
             className={'bg-emerald-600 w-full'}>
             {!editProfile ? 'Изменить профиль' : 'Не изменять профиль'}
           </Button>
         </div>
        }
        {editProfile &&
         <div className={style.button}>
           <Button
             onClick={clickChangeAvatar}
             variant="success"
             className={'bg-emerald-600 w-full'}>
             {!showEditAvatar ? 'Изменить аватар' : 'Не изменять аватар'}
           </Button>
         </div>
        }
        {editProfile &&
         <div className={style.button}>
           <Button
             onClick={clickChangePass}
             variant="success"
             className={'bg-emerald-600 w-full'}>
             {!showEditPass ? 'Изменить пароль' : 'Не изменять пароль'}
           </Button>
         </div>
        }
        {editProfile &&
          isAdmin &&
          nickname !== user.nickname &&
          <div className={style.button}>
            <Button
              onClick={clickDeleteProfile}
              variant="danger"
              className={'bg-red-800 w-full'}>
              Удалить пользователя
            </Button>
          </div>
        }
      </div>
      {(!notShowInfo || editProfile) &&
        (<div className={style.sectionInfo}>
        <Registration
          onlyShowInfo={!editProfile}
          changeProfile={true}
          defaultInfoUser={user}
          showDelAvatar={showEditAvatar}
          showEditAvatar={showEditAvatar}
          showEditPass={showEditPass}
        />
      </div>)
      }
    </div>
  )
}

export default UserProfileEdit
