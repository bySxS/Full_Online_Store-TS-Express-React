import React, { FC } from 'react'
import { NavLink } from 'react-bootstrap'
import { ICharValue } from 'store/myStore/myStoreCharacteristics.interface'
import MyLink from 'components/UI/MyLink/MyLink'
import style from './ProductAllCharacteristicsValues.module.scss'

interface IProductAllCharacteristicsValues {
  characteristicsValues: ICharValue[]
  onClickFindProduct?: (valueChar: string) => void
  onClickUpdCharValue?: (characteristicsValueId: number, characteristicsValue: string) => void
  onClickDelete?: (characteristicsValueId: number, valueName: string) => void
}

const ProductAllCharacteristicsValues: FC<IProductAllCharacteristicsValues> = ({
  characteristicsValues,
  onClickFindProduct,
  onClickUpdCharValue,
  onClickDelete
}) => {
  return (
    <>
      {characteristicsValues.map((charValue, i, arr) =>
      // (i === arr.length - 1) ?
          <span
            key={charValue.characteristicValueId + charValue.characteristicValue}
            className={style.valueCharSpan}
          >
            {onClickFindProduct
              ? <NavLink
                className={style.valueChar}
                onClick={() => onClickFindProduct(charValue.characteristicValue)}
              >
              {charValue.characteristicValue}
            </NavLink>
              : <span className={style.valueChar}>
                {charValue.characteristicValue}
              </span>
            }
          {onClickUpdCharValue &&
          <MyLink
            onClick={() => onClickUpdCharValue(charValue.characteristicValueId, charValue.characteristicValue)}
            className={'px-1.5'}
          >
          <i className="bi bi-pencil-fill text-indigo-700"/>
          </MyLink>
          }
          {onClickDelete &&
           <MyLink
            onClick={() => onClickDelete(charValue.characteristicValueId, charValue.characteristicValue)}
            >
             <i className="bi bi-trash3-fill text-red-600"/>
            </MyLink>
          }{(i !== arr.length - 1) && ','}
          </span>
      )}
    </>
  )
}

export default ProductAllCharacteristicsValues
