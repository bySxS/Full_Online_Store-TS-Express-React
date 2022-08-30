import React, { FC } from 'react'
import style from 'components/ProductListBasket/ProductItemBasket/ProductItemBasket.module.scss'
import { IFormCategoryState } from 'pages/AdminPanel/EditCategory/FormCategory/FormCategory'
import { ICategory } from 'store/myStore/myStoreCategory.interface'

interface IButtonEditCategory {
  clickEdit: (payload: IFormCategoryState) => void
  category: ICategory
}

const ButtonEditCategory: FC<IButtonEditCategory> = ({
  clickEdit,
  category
}) => {
  return (
    <div className={`${style.blockButton} justify-end`}>
           <span
             onClick={(e) => {
               e.stopPropagation()
               e.preventDefault()
               clickEdit({
                 type: 'upd',
                 category: {
                   id: category.id,
                   iconClass: category.iconClass,
                   name: category.name,
                   nameEng: category.nameEng,
                   parentId: category.parentId
                 }
               })
             }}
             className={style.link}
           >
            <i className="bi bi-pencil-fill text-2xl text-indigo-700"/>
            </span>
      <span
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          clickEdit({
            type: 'del',
            category: {
              id: category.id,
              iconClass: category.iconClass,
              name: category.name,
              nameEng: category.nameEng,
              parentId: category.parentId
            }
          })
        }}
        className={style.link}
      >
          <i className="bi bi-trash3-fill text-2xl text-red-600"/>
        </span>
    </div>
  )
}

export default ButtonEditCategory
