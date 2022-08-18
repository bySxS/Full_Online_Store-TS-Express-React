import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { IProduct } from 'store/myStore/myStoreProduct.interface'
import FavIcon from 'components/FavIcon/FavIcon'
import { RoutePath } from '../../../AppRouter'
import style from './ProductViewCol.module.scss'

interface IProductViewColProps {
  product: IProduct
}

const ProductViewCol: FC<IProductViewColProps> = ({ product }) => {
  const navigate = useNavigate()
  const clickLiProductHandler = (id: number) => {
    const path = `${RoutePath.PRODUCTS}/${id}`
    navigate(path)
  }

  return (
    <>
      <div className={style.productItem}
           onClick={() => { clickLiProductHandler(product.id) }}>
      <div className={style.sectionFav}>
        <FavIcon productId={product.id} />
      </div>
        <div className={style.sectionInfo}>
          <div className={style.title}>{product.title}</div>
          <div className={style.price}>
            <i className="bi bi-tag-fill text-green-500"/>
            {product.price}{product.priceCurrency}
          </div>
        </div>
        <div className={style.sectionScreen}>
          <div className={style.screen}>
            <img src={product.screen} className={'h-full m-auto'} />
          </div>
        </div>
        <div className={style.sectionViews}>
          <div className={style.sectionViewsBlock}>
            <div><i className="bi bi-eye"/> {product.view}</div>
            <div><i className="bi bi-hand-thumbs-up-fill text-green-500"/> {product.ratingPlus}</div>
          </div>
          <div className={style.sectionViewsBlock}>
            <div><i className="bi bi-star-fill text-yellow-400"/> {product.countInFavorites}</div>
            <div><i className="bi bi-hand-thumbs-down-fill text-red-500"/> {product.ratingMinus}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductViewCol
