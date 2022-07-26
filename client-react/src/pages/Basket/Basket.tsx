import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

interface BasketProps {
  name: string
}

const Basket: FC<BasketProps> = ({ name }) => {
  return (
    <div className="body">
      <Helmet>
        <title>{name}</title>
        <meta name="description" content="{name}" />
      </Helmet>
      <div className="font-bold">{name}</div>
    </div>
  )
}

export default Basket
