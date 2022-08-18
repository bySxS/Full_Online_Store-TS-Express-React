import React, { FC } from 'react'
import { Helmet } from 'react-helmet'
import { CardComponent } from 'components/UI/Card/CardComponent'
import style from './LoginReg.module.scss'

interface LoginRegProps {
  name: string
  children: React.ReactNode
}

const LoginReg: FC<LoginRegProps> = ({ name, children }) => {
  // const location = useLocation()

  return (
    <div className={style.head}>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content="{name}" />
      </Helmet>
      <CardComponent title={name} className="w-[400px]">
        {/* {location.pathname === '/login' */}
        {/*  ? <Login/> */}
        {/*  : <Registration /> */}
        {/* } */}
        {children}
      </CardComponent>
    </div>
  )
}

export default LoginReg
