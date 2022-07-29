import React from 'react'
import { Dropdown } from 'react-bootstrap'
import st from 'components/Header/Header.module.scss'
import { useAuth } from 'hooks/useAuth'
import { RoutePath } from 'AppRouter'
import { NavLink } from 'react-router-dom'
import { useLazyLogoutQuery } from 'store/myStore/myStoreUser.api'
import { useInfoLoading } from 'hooks/useInfoLoading'

const Profile = () => {
  const { auth, user } = useAuth()
  const [logout, { isLoading, isSuccess, isError, error, data }] = useLazyLogoutQuery()
  useInfoLoading({ isLoading, isSuccess, isError, error, data })

  return (
    <div>
      <Dropdown className={'pr-2'}>
        <Dropdown.Toggle className={`border-0 ${st.btn}`}>
          <i className="bi bi-person-circle text-3xl text-gray-700 pr-1.5"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu className={st.drop_menu}>

          <Dropdown.Item className="dropdown-header">
            <h6>{auth ? user?.nickname : 'Гость'}</h6>
            <span>{auth ? user?.rolesName : 'Група'}</span>
          </Dropdown.Item>

          <Dropdown.Item className="dropdown-item d-flex align-items-center">
            <i className="bi bi-person pr-1.5"></i>
            <span>My Profile</span>
          </Dropdown.Item>

          <Dropdown.Item className="dropdown-item d-flex align-items-center" href="#">
            <i className="bi bi-gear pr-1.5"></i>
            <span>Account Settings</span>
          </Dropdown.Item>

          <Dropdown.Item className="dropdown-item d-flex align-items-center" href="#">
            <i className="bi bi-question-circle pr-1.5"></i>
            <span>Need Help?</span>
          </Dropdown.Item>
          <Dropdown.Divider />
          {!auth
            ? <span>
            <NavLink className="dropdown-item d-flex align-items-center" to={`${RoutePath.LOGIN_REGISTRATION}`}>
            <i className="bi bi-box-arrow-in-right pr-1.5"></i>
            <span>Вход / Регистрация</span>
            </NavLink>
            </span>
            : <span>
            <Dropdown.Item className="dropdown-item d-flex align-items-center" onClick={() => logout('')}>
            <i className="bi bi-box-arrow-in-left pr-1.5"></i>
            <span>Выйти</span>
            </Dropdown.Item>
            </span>
          }
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default Profile
