import React from 'react'
import { useAppActions, useAppSelector } from '../../hooks/useStore'
import selectProduct from '../../store/product/product.selector'
import style from './ProductsPanelSetting.module.scss'

const ProductsPanelSetting = () => {
  const { changeViewProducts } = useAppActions()
  const viewProducts = useAppSelector(selectProduct.viewProducts)
  const handleClick = () => changeViewProducts()
  return (
    <div className={style.panel}>
      <div className={style.viewProducts}>{viewProducts === 'Row'
        ? <i className={`bi bi-grid-fill ${style.iconView}`} onClick={handleClick}/>
        : <i className={`bi bi-app ${style.iconView}`} onClick={handleClick}/> }</div>
      <div></div>
    </div>
  )
}

export default ProductsPanelSetting
