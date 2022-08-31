import React, { FC } from 'react'
import { ICharacteristicName } from 'store/myStore/myStoreCharacteristics.interface'
import { IFormCharacteristicsState } from '../FormCharacteristics/FormCharacteristics'
import style from './ButtonEditCharacteristics.module.scss'

interface IButtonEditCategory {
  clickEdit: (payload: IFormCharacteristicsState) => void
  characteristics: ICharacteristicName
  section?: boolean
}

const ButtonEditCharacteristics: FC<IButtonEditCategory> = ({
  clickEdit,
  characteristics,
  section = false
}) => {
  return (
    <div className={`${style.blockButton} justify-end`}>
           <span
             onClick={(e) => {
               e.stopPropagation()
               e.preventDefault()
               clickEdit({
                 type: 'upd',
                 body: {
                   id: characteristics.id,
                   name: characteristics.name,
                   fieldType: characteristics.fieldType,
                   parentId: characteristics.parentId,
                   categoryId: characteristics.categoryId
                 },
                 section
               })
             }}
             className={style.link}
           >
            <i className="bi bi-pencil-fill text-indigo-700"/>
            </span>
      <span
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          clickEdit({
            type: 'del',
            body: {
              id: characteristics.id,
              name: characteristics.name,
              fieldType: characteristics.fieldType,
              parentId: characteristics.parentId,
              categoryId: characteristics.categoryId
            },
            section
          })
        }}
        className={style.link}
      >
          <i className="bi bi-trash3-fill text-red-600"/>
        </span>
    </div>
  )
}

export default ButtonEditCharacteristics
