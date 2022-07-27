import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

interface UserDetailsProps {
  name: string
}

const UserDetails: FC<UserDetailsProps> = ({ name }) => {
  return (
    <div>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content="{name}" />
      </Helmet>
      <div className="font-bold text-center">{name}</div>
    </div>
  )
}

export default UserDetails
