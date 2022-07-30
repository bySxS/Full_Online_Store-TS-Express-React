import React from 'react'
import { Helmet } from 'react-helmet'

// interface UserDetailsProps {
//   name: string
// }

const UserDetails = () => {
  return (
    <div>
      <Helmet>
        <title></title>
        <meta name="description" content="{name}" />
      </Helmet>
      <div className="font-bold text-center"></div>
    </div>
  )
}

export default UserDetails
