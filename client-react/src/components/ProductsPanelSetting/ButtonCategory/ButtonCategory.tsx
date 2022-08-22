import React, { useContext } from 'react'
import { useAppSelector } from 'hooks/useStore'
import selectCategory from 'store/category/category.selector'
import selectProduct from 'store/product/product.selector'
import { MyDropDownToggle } from 'components/UI/DropDownToggle/DropDownToggle'
import { ModalContext } from 'context/ModalContext'

const ButtonCategory = () => {
  const { modal, openModal, closeModal } = useContext(ModalContext)

  const clickOpenCharModal = () => {
    if (modal) {
      closeModal()
    } else {
      openModal()
    }
  }
  const filterState = useAppSelector(selectProduct.filterState)
  const categoryName =
    useAppSelector(selectCategory.categoryNameById(filterState.categoryId || 0))
  return (
    <>
      <MyDropDownToggle onClick={clickOpenCharModal}>
        Category{categoryName && `: ${categoryName}`}
      </MyDropDownToggle>
    </>
  )
}

export default ButtonCategory
