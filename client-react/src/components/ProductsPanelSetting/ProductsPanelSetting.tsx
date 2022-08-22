import React, { useContext } from 'react'
import { useAppActions, useAppSelector } from 'hooks/useStore'
import selectProduct from 'store/product/product.selector'
import { ModalContext } from '../../context/ModalContext'
import OffCanvas from '../UI/OffCanvas/OffCanvas'
import ButtonCategory from './ButtonCategory/ButtonCategory'
import ButtonChar from './ButtonChar/ButtonChar'
import ButtonSort from './ButtonSort/ButtonSort'
import PanelFilter from './PanelFilter/PanelFilter'
import style from './ProductsPanelSetting.module.scss'

const ProductsPanelSetting = () => {
  const { modal, closeModal } = useContext(ModalContext)
  const { changeViewProducts } = useAppActions()
  const viewProducts = useAppSelector(selectProduct.viewProducts)
  const handleClick = () => changeViewProducts()
  return (
    <div className={style.panel}>
      <div className={style.viewProducts}>{viewProducts === 'Row'
        ? <i className={`bi bi-grid-fill ${style.iconView}`} onClick={handleClick}/>
        : <i className={`bi bi-app ${style.iconView}`} onClick={handleClick}/> }
      </div>
      <div className={style.buttonSort}>
        <ButtonSort />
      </div>
      <div className={style.sectionButtonChar}>
        <ButtonChar />
      </div>
      <div className={style.buttonSort}>
        <ButtonCategory />
      </div>
      {modal &&
      <OffCanvas
        show={modal}
        onClose={closeModal}
        className={style.panelFilter}
        backdrop={true}
        backdropClassName={style.backdrop}
      >
        <PanelFilter />
      </OffCanvas>
      }
    </div>
  )
}

export default ProductsPanelSetting
