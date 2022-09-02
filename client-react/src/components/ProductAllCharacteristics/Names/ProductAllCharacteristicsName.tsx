import React, { FC } from 'react'
import { ICharName } from 'store/myStore/myStoreCharacteristics.interface'
import MyLink from '../../UI/MyLink/MyLink'
import style from './ProductAllCharacteristicsName.module.scss'
import ProductAllCharacteristicsValues from '../Values/ProductAllCharacteristicsValues'

interface IProductAllCharacteristicsName {
  characteristicsNames: ICharName[]
  onClickFindProduct?: (valueChar: string) => void
  onClickAddCharValue?: (characteristicsNameId: number,
    characteristicsName: string) => void
  onClickUpdCharValue?: (characteristicsValueId: number,
    characteristicsValue: string,
    characteristicsName: string,
    characteristicsNameId: number) => void
  onClickDelete?: (characteristicsValueId: number, valueName: string) => void
}

const ProductAllCharacteristicsName: FC<IProductAllCharacteristicsName> = ({
  characteristicsNames,
  onClickFindProduct,
  onClickAddCharValue,
  onClickUpdCharValue,
  onClickDelete
}) => {
  return (
    <>
      {characteristicsNames.map((char) =>
        <div
          key={char.characteristicNameId}
          className={style.containerCategory}
        >
                <span className={style.nameChar}>
                  {char.characteristicName}
                </span>{': '}
          <ProductAllCharacteristicsValues
            characteristicsValues={char.values || []}
            onClickFindProduct={onClickFindProduct}
            onClickDelete={onClickDelete}
            onClickUpdCharValue={onClickUpdCharValue
              ? (characteristicsValueId: number, characteristicsValue: string) => {
                  onClickUpdCharValue(
                    characteristicsValueId,
                    characteristicsValue,
                    char.characteristicName,
                    char.characteristicNameId
                  )
                }
              : undefined}
          />
          {onClickAddCharValue &&
          <MyLink
            onClick={() => onClickAddCharValue(char.characteristicNameId, char.characteristicName)}
          >
          <i className={'bi bi-plus-circle-fill pl-3'}/>
          </MyLink>
          }
        </div>
      )}
    </>
  )
}

export default ProductAllCharacteristicsName
