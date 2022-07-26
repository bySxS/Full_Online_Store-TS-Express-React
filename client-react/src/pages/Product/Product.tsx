import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

interface ProductProps {
  name: string
}

const Product: FC<ProductProps> = ({ name }) => {
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

export default Product
