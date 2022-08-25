import React, { FC, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useBreadcrumb } from 'context/BreadcrumbContext'

interface AllOrdersProps {
  name: string
}

const AllOrders: FC<AllOrdersProps> = ({ name }) => {
  const { setBreadcrumb } = useBreadcrumb()
  useEffect(() => {
    setBreadcrumb({})
  }, [])
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
