import React, { FC } from 'react'
import { Button } from 'react-bootstrap'
import { IProduct } from 'store/myStore/myStoreProduct.interface'
import { useAppSelector } from 'hooks/useStore'
import selectBasket from 'store/basket/basket.selector'
import FavIcon from '../FavIcon/FavIcon'
import ProductGeneralCharacteristics from '../ProductGeneralCharacteristics/ProductGeneralCharacteristics'
import ProductImagesCarousel from '../ProductImagesCarusel/ProductImagesCarusel'
import ProductPrice from '../ProductPrice/ProductPrice'
import style from './ProductDetailsHead.module.scss'

interface IProductDetailsHead {
  product: IProduct
}

const ProductDetailsHead: FC<IProductDetailsHead> = ({ product }) => {
  // const {
  //   addToBasket, delFromBasket
  // } = useAppActions()
  const isInBasket = useAppSelector(selectBasket.productIsInBasket(product.id))
  // const clickAddToBasket = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault()
  //   addToBasket(id)
  // }
  //
  // const removeFromBasket = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault()
  //   delFromBasket(id)
  // }
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
            {!isInBasket &&
              <div className={style.buttonSection}>
              <Button className={'bg-success hover:opacity-80'} variant={'success'}>
              Купить
            </Button>
              </div>
            }
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
