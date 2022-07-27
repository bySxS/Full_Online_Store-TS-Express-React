import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

interface AllOrdersProps {
  name: string
}

const AllOrders: FC<AllOrdersProps> = ({ name }) => {
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

export default AllOrders
