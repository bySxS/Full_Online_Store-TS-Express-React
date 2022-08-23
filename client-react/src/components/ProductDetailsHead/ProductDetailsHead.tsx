import React, { FC } from 'react'
import { IProduct } from 'store/myStore/myStoreProduct.interface'
import ProductImagesCarousel from '../ProductImagesCarusel/ProductImagesCarusel'
import style from './ProductDetailsHead.module.scss'

interface IProductDetailsHead {
  product: IProduct
}

const ProductDetailsHead: FC<IProductDetailsHead> = ({ product }) => {
  return (
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
          {product.characteristics && product.characteristics[0] &&
            product.characteristics[0].characteristics.map(char => (
              <div className={style.characteristics}
                   key={char.characteristicNameId}>
          <span className={style.nameCharacteristics}>
            {char.characteristicName}:
          </span> {char.values &&
                char.values
                  .map(val => val.characteristicValue)
                  .join(', ')}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsHead
