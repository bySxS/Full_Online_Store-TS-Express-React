import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

interface ProductDetailsProps {
  name: string
}

const ProductDetails: FC<ProductDetailsProps> = ({ name }) => {
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

export default ProductDetails
