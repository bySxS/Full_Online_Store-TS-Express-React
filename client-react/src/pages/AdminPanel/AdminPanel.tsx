import React, { FC } from 'react'
import { Helmet } from 'react-helmet'
import { NavLink } from 'react-router-dom'
import { RoutePath } from 'AppRouter'
import st from 'components/SideBar/SideBar.module.scss'
import style from 'pages/Users/Users.module.scss'
import { Breadcrumbs } from 'components/Breadcrumb/Breadcrumb'

interface AdminPanelProps {
  name: string
}

const AdminPanel: FC<AdminPanelProps> = ({ name }) => {
  return (
    <div>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content="{name}" />
      </Helmet>
      <Breadcrumbs className={style.breadcrumbs} />
      <div className="font-bold">{name}</div>
      <NavLink to={RoutePath.USERS} className="nav-link link-dark py-1 border-bottom rounded-0">
        <div className={`${st.link_flex} hover:text-white hover:bg-gray-400`}>
          <div><i className="bi bi-people-fill text-2xl pr-1.5"/></div>
          <div>Пользователи</div>
        </div>
      </NavLink>
    </div>
  )
}

export default AdminPanel
