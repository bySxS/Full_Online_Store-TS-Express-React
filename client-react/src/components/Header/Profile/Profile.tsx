import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import st from 'components/Header/Header.module.scss'
import { useAuth } from 'hooks/useAuth'
import { RoutePath } from 'AppRouter'
import { NavLink } from 'react-router-dom'
import { useLazyLogoutQuery } from 'store/myStore/myStoreUser.api'
import { useInfoLoading } from 'hooks/useInfoLoading'
import UserProfile from 'components/UserProfile/UserProfile'
import { ModalComponent } from 'components/UI/Modal/ModalComponent'
import UserProfileEdit from 'components/UserProfileEdit/UserProfileEdit'
import LoginReg from 'components/LoginReg/LoginReg'
import style from './Profile.module.scss'

const Profile = () => {
  const { isAuth, nickname, avatarUrl, roles, isAdmin, user } = useAuth()
  const [logout, { isLoading, isSuccess, isError, error, data }] = useLazyLogoutQuery()
  useInfoLoading({ isLoading, isSuccess, isError, error, data })

  const [showProfile, setShowProfile] = useState(false)
  const handleCloseProfile = () => setShowProfile(false)
  const handleShowProfile = () => setShowProfile(true)

  const [showProfileEdit, setShowProfileEdit] = useState(false)
  const handleCloseProfileEdit = () => setShowProfileEdit(false)
  const handleShowProfileEdit = () => setShowProfileEdit(true)

  return (
    <div>
      <Dropdown className={'pr-2'}>
        <Dropdown.Toggle
          className={`${st.btn} ${style.btnAvatar}`}
        style={{ backgroundColor: 'transparent' }}>
          {isAuth && avatarUrl
            ? <img src={avatarUrl} alt={nickname} className={style.avatar} />
            : <i className="bi bi-person-circle text-5xl text-gray-700"/>
          }
        </Dropdown.Toggle>

        <Dropdown.Menu className={st.drop_menu}>

          <Dropdown.Item className="dropdown-header">
            <h6>Ник: {nickname}</h6>
            <span>Группа: {roles}</span>
          </Dropdown.Item>

          {isAuth &&
          <>
            <Dropdown.Item
              className="dropdown-item d-flex align-items-center"
              onClick={handleShowProfile}>
              <i className="bi bi-person pr-1.5"></i>
              <span>Мой профиль</span>
            </Dropdown.Item>
            {showProfile && user &&
              <ModalComponent
                show={showProfile}
                title={'Ваш профиль'}
                onClose={handleCloseProfile}
                className={'w-[750px]'}
              >
                <UserProfile user={user}/>
              </ModalComponent>
            }
            <Dropdown.Divider />
            <Dropdown.Item
              className="dropdown-item flex items-center"
              onClick={handleShowProfileEdit}
            >
              <i className="bi bi-gear pr-1.5"></i>
              <span>Редакт. профиль</span>
            </Dropdown.Item>
            {showProfileEdit && user &&
             <ModalComponent
               show={showProfileEdit}
               title={'Редактировать ваш профиль'}
               onClose={handleCloseProfileEdit}
               className={'w-[750px]'}
             >
               <UserProfileEdit user={user}/>
             </ModalComponent>
            }
            <Dropdown.Divider />
          </>
          }
          {isAuth &&
            <>
              <NavLink className="dropdown-item d-flex align-items-center" to={RoutePath.ALL_ORDERS}>
                <i className="bi bi-card-list pr-1.5"></i>
                <span>Все заказы</span>
              </NavLink>
              <Dropdown.Divider />
            </>
          }
          {isAdmin &&
          <>
            <NavLink className="dropdown-item d-flex align-items-center" to={RoutePath.ADMIN_PANEL}>
            <i className="bi bi-pc-display-horizontal pr-1.5"></i>
            <span>Админ-панель</span>
            </NavLink>
            <Dropdown.Divider />
          </>
          }
          {!isAuth
            ? <LoginReg />
            : <>
            <Dropdown.Item className="dropdown-item d-flex align-items-center"
                           onClick={() => logout('')}>
            <i className="bi bi-box-arrow-in-left pr-1.5"></i>
            <span>Выйти</span>
            </Dropdown.Item>
            </>
          }
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default Profile
