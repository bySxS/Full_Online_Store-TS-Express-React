import React, { FC } from 'react'
import { IProduct } from 'store/myStore/myStoreProduct.interface'
import FavIcon from '../FavIcon/FavIcon'
import ProductGeneralCharacteristics from '../ProductGeneralCharacteristics/ProductGeneralCharacteristics'
import ProductImagesCarousel from '../ProductImagesCarusel/ProductImagesCarusel'
import ProductPrice from '../ProductPrice/ProductPrice'
import ButtonBasket from './ButtonBasket/ButtonBasket'
import style from './ProductDetailsHead.module.scss'

interface IProductDetailsHead {
  product: IProduct
}

const ProductDetailsHead: FC<IProductDetailsHead> = ({ product }) => {
  return (
    <div className={style.firstContainer}>
    <div className={style.block}>
      <div className={style.blockScreen}>
        <ProductImagesCarousel product={product} />
      </div>
      <div className={style.blockInfo}>

        <div className={style.blockStat}>
          <div className={style.sectionViews}>
            <i className="bi bi-eye"/> {product.view}
          </div>
          <div className={style.sectionViews}>
            <i className="bi bi-star-fill text-yellow-400"/> {product.countInFavorites}
          </div>
          <div className={style.sectionViews}>
            <i className="bi bi-hand-thumbs-up-fill text-green-500"/> {product.ratingPlus}
          </div>
          <div className={style.sectionViews}>
            <i className="bi bi-hand-thumbs-down-fill text-red-500"/> {product.ratingMinus}
          </div>
        </div>
        <div className={style.blockTitle}>
          {product.title}
        </div>

        <div className={style.blockGeneralCharacteristics}>
          <ProductGeneralCharacteristics product={product} />
        </div>

        <div className={style.blockPrice}>
          <ProductPrice product={product} />
          <div className={style.blockButton}>
            <div className={style.buttonSection}>
            <ButtonBasket productId={product.id} />
            </div>
            <div className={style.buttonSection}>
            <FavIcon productId={product.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ProductDetailsHead
