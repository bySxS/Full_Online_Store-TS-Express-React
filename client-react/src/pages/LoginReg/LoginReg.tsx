import React, { FC } from 'react'
import { Helmet } from 'react-helmet'
import { CardComponent } from 'components/UI/Card/CardComponent'
import Login from 'components/Login/Login'
import { useLocation } from 'react-router-dom'
import Registration from 'components/Registration/Registration'

interface LoginRegProps {
  name: string
}

const LoginReg: FC<LoginRegProps> = ({ name }) => {
  const location = useLocation()

  return (
    <div>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content="{name}" />
      </Helmet>
      <CardComponent title={name} className="w-[400px]">
        {location.pathname === '/login'
          ? <Login/>
          : <Registration />
        }
      </CardComponent>
    </div>
  )
}

export default LoginReg
