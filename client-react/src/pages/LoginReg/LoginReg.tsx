import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

interface LoginRegProps {
  name: string
}

const LoginReg: FC<LoginRegProps> = ({ name }) => {
  return (
    <div>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content="{name}" />
      </Helmet>
      <div className="font-bold">{name}</div>
    </div>
  )
}

export default LoginReg
