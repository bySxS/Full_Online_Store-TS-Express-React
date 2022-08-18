import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { IProduct } from 'store/myStore/myStoreProduct.interface'
import FavIcon from 'components/FavIcon/FavIcon'
import { RoutePath } from 'AppRouter'
import style from './ProductViewRow.module.scss'

interface IProductViewRowProps {
  product: IProduct
}

const ProductViewRow: FC<IProductViewRowProps> = ({ product }) => {
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
      <div className={style.sectionScreen}>
        <div className={style.screen}>
          <img src={product.screen} className={'h-full m-auto'} />
        </div>
      </div>
      <div className={style.sectionInfo}>
        <div className={style.title}>{product.title}</div>
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
        <div className={style.price}>
          <i className="bi bi-tag-fill text-green-500"/>
          {product.price}{product.priceCurrency}
        </div>
      </div>
      <div className={style.sectionViews}>
        <div className={style.sectionViewsBlock}>
          <i className="bi bi-eye"/> {product.view}
        </div>
        <div className={style.sectionViewsBlock}>
          <i className="bi bi-star-fill text-yellow-400"/> {product.countInFavorites}
        </div>
        <div className={style.sectionViewsBlock}>
          <i className="bi bi-hand-thumbs-up-fill text-green-500"/> {product.ratingPlus}
        </div>
        <div className={style.sectionViewsBlock}>
          <i className="bi bi-hand-thumbs-down-fill text-red-500"/> {product.ratingMinus}
        </div>
      </div>
      </div>
    </>
  )
}

export default ProductViewRow
