import React, { FC } from 'react'
import { IProduct } from 'store/myStore/myStoreProduct.interface'
import style from './ProductItems.module.scss'
import { useAppSelector } from 'hooks/useStore'
import selectProduct from 'store/product/product.selector'

interface ProductItemProps {
  product: IProduct
}

const ProductItems: FC<ProductItemProps> = ({ product }) => {
  const viewProducts = useAppSelector(selectProduct.viewProducts)
  const isInFav = useAppSelector(selectProduct.productIsInFavorite(product.id))
  //
  return (
    <div className={style.productItem}>
    {viewProducts === 'Row'
      ? <>
      <div className={style.sectionRowFav}>
        {isInFav
          ? <i className="bi bi-star-fill text-yellow-400"/>
          : <i className="bi bi-star"/>
        }
      </div>
      <div className={style.sectionRowScreen}>
        <div className={style.screenRow}>
          <img src={product.screen} className={'h-full m-auto'} />
        </div>
      </div>
      <div className={style.sectionRowInfo}>
        <div className={style.title}>{product.title}</div>
        <div className={style.characteristicsRow}>
          <span className={style.nameCharacteristicsRow}>
            Категория:
          </span> {product.categoryName}</div>
        <div className={style.characteristicsRow}>
          <span className={style.nameCharacteristicsRow}>
            Раздел:
          </span> {product.sectionName}</div>
        <div className={style.characteristicsRow}>
          <span className={style.nameCharacteristicsRow}>
            Категория:
          </span> {product.categoryName}</div>
        <div className={style.characteristicsRow}>
          <span className={style.nameCharacteristicsRow}>
            Раздел:
          </span> {product.sectionName}</div>
        <div className={style.price}>
          <i className="bi bi-tag-fill text-green-500"/>
          {product.price}{product.priceCurrency}
        </div>
      </div>
      <div className={style.sectionRowViews}>
        <div><i className="bi bi-eye"/> {product.view}</div>
      </div>
      </>
      : <>
      <div className={style.sectionColFav}>
        {isInFav
          ? <i className="bi bi-star-fill text-yellow-400"/>
          : <i className="bi bi-star"/>
        }
      </div>
        </>
    }
    </div>
  )
}

export default ProductItems
