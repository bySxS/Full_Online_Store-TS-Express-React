import React, { FC } from 'react'
import { ICharacteristicSection } from 'store/myStore/myStoreCharacteristics.interface'
import style from './ProductAllCharacteristicsSection.module.scss'
import ProductAllCharacteristicsName from './Names/ProductAllCharacteristicsName'

interface IProductAllCharacteristicsSection {
  characteristics: ICharacteristicSection[]
  onClickFindProduct?: (valueChar: string) => void
  onClickAddCharValue?: (characteristicsNameId: number,
    characteristicsName: string) => void
  onClickUpdCharValue?: (characteristicsValueId: number,
    characteristicsValue: string,
    characteristicsName: string,
    characteristicsNameId: number) => void
  onClickDelete?: (characteristicsValueId: number,
    valueName: string) => void
}

const ProductAllCharacteristicsSection: FC<IProductAllCharacteristicsSection> = ({
  characteristics,
  onClickFindProduct,
  onClickAddCharValue,
  onClickUpdCharValue,
  onClickDelete
}) => {
  return (
    <>
      {characteristics && characteristics.map(sect =>
        <span key={sect.sectionName}>
        <div>
        <div className={style.sectionName}>
          {sect.sectionName}
        </div>
        <div className={style.containerSection}>
         <ProductAllCharacteristicsName
            characteristicsNames={sect.characteristics}
            onClickFindProduct={onClickFindProduct}
            onClickAddCharValue={onClickAddCharValue}
            onClickUpdCharValue={onClickUpdCharValue}
            onClickDelete={onClickDelete}
         />
        </div>
      </div>
      </span>
      )}
    </>
  )
}

export default ProductAllCharacteristicsSection
