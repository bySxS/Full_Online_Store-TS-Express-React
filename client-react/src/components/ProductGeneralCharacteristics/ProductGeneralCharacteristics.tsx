import React, { FC } from 'react'
import { IProduct } from 'store/myStore/myStoreProduct.interface'
import style from './ProductGeneralCharacteristics.module.scss'

interface IProductGeneralCharacteristics {
  product: IProduct
}

const ProductGeneralCharacteristics: FC<IProductGeneralCharacteristics> = ({ product }) => {
  return (
    <>
      {product.characteristics && product.characteristics[0] &&
        product.characteristics[0].characteristics.map(char => (
          <div className={style.characteristics}
               key={char.characteristicNameId}
          >
                <span className={style.nameCharacteristics}>
                {char.characteristicName}:
                </span> {char.values &&
            char.values
              .map(val => val.characteristicValue)
              .join(', ')}
          </div>
        ))}
    </>
  )
}

export default ProductGeneralCharacteristics
