import React, { useContext } from 'react'
import { Dropdown } from 'react-bootstrap'
import st from 'components/Header/Header.module.scss'
import { useAuth } from 'hooks/useAuth'
import { RoutePath } from 'AppRouter'
import { NavLink } from 'react-router-dom'
import { useLazyLogoutQuery } from 'store/myStore/myStoreUser.api'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { ModalContext } from 'components/UI/Modal/ModalContext'
import UserItems from 'components/UserItems/UserItems'
import { ModalComponent } from 'components/UI/Modal/ModalComponent'
import style from './Profile.module.scss'

const Profile = () => {
  const { isAuth, nickname, avatarUrl, roles, isAdmin, user } = useAuth()
  const [logout, { isLoading, isSuccess, isError, error, data }] = useLazyLogoutQuery()
  useInfoLoading({ isLoading, isSuccess, isError, error, data })
  const { modal, openModal, closeModal } = useContext(ModalContext)

  return (
    <div>
      <Dropdown className={'pr-2'}>
        <Dropdown.Toggle className={`border-0 ${st.btn}`}>
          {isAuth && avatarUrl
            ? <img src={avatarUrl} className={style.avatar} />
            : <i className="bi bi-person-circle text-3xl text-gray-700 pr-1.5"/>
          }
        </Dropdown.Toggle>

        <Dropdown.Menu className={st.drop_menu}>

          <Dropdown.Item className="dropdown-header">
            <h6>{nickname}</h6>
            <span>{roles}</span>
          </Dropdown.Item>

          {isAuth &&
          <>
            <Dropdown.Item className="dropdown-item d-flex align-items-center" onClick={openModal}>
              <i className="bi bi-person pr-1.5"></i>
              <span>My Profile</span>
            </Dropdown.Item>
            {modal && user &&
              <ModalComponent show={modal} title={'Ваш профиль'} onClose={closeModal}>
                <UserItems user={user}/>
              </ModalComponent>
            }
            <Dropdown.Divider />
            <Dropdown.Item className="dropdown-item d-flex align-items-center" href="#">
              <i className="bi bi-gear pr-1.5"></i>
              <span>Account Settings</span>
            </Dropdown.Item>
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
            ? <>
            <NavLink className="dropdown-item d-flex align-items-center" to={RoutePath.LOGIN_REGISTRATION}>
            <i className="bi bi-box-arrow-in-right pr-1.5"></i>
            <span>Вход / Регистрация</span>
            </NavLink>
            </>
            : <>
            <Dropdown.Item className="dropdown-item d-flex align-items-center" onClick={() => logout('')}>
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
