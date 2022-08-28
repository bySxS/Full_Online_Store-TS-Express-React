import React, { FC } from 'react'
import style from './ProductItemSmall.module.scss'

export interface IProductItemSmall {
  productId: number
  productTitle: string
  productScreen: string
}

const ProductItemSmall: FC<IProductItemSmall> = ({
  productScreen,
  // productId,
  productTitle
}) => {
  return (
    <div className={style.block}>
    <div className={style.blockScreen}>
      {productScreen
        ? <img className={style.image} src={productScreen} />
        : <i className="bi bi-image text-4xl"></i>
      }
    </div>
    <div className={style.blockTitle}>
      {productTitle}
    </div>
      <div className={style.blockButton}>
        <span className={style.link}>
          <i className="bi bi-arrow-right-square-fill text-black"/>
        </span>
        <span className={style.link}>
          <i className="bi bi-pencil-fill text-indigo-700"/>
        </span>
        <span className={style.link}>
          <i className="bi bi-trash3-fill text-red-600"/>
        </span>
      </div>
    </div>
  )
}

export default ProductItemSmall
