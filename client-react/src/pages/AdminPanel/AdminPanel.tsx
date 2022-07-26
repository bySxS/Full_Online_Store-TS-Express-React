import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

interface AdminPanelProps {
  name: string
}

const AdminPanel: FC<AdminPanelProps> = ({ name }) => {
  return (
    <div className={'body'}>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content="{name}" />
      </Helmet>
      <div className="font-bold">{name}</div>
    </div>
  )
}

export default AdminPanel
