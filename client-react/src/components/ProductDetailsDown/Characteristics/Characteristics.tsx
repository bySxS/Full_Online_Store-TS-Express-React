import React, { FC, useEffect, useState } from 'react'
import { NavLink } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useGetCharacteristicProductByIdQuery } from 'store/myStore/myStoreCharacteristics.api'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { ICharacteristicSection } from 'store/myStore/myStoreCharacteristics.interface'
import { useAppActions } from 'hooks/useStore'
import { RoutePath } from 'AppRouter'
import style from './Characteristics.module.scss'

interface ICharacteristics {
  productId: number
}

const Characteristics: FC<ICharacteristics> = ({ productId }) => {
  const {
    isLoading, isSuccess, isError, data, error
  } = useGetCharacteristicProductByIdQuery(productId)
  const { changeFilterState } = useAppActions()
  const navigate = useNavigate()
  useInfoLoading({
    isLoading, isSuccess, isError, data, error
  })
  const [characteristics, setCharacteristics] = useState<ICharacteristicSection[]>()
  useEffect(() => {
    if (isSuccess && data && data.result) {
      setCharacteristics(data.result)
    }
  }, [isSuccess])

  const clickFindProductByChar = (valueChar: string) => {
    changeFilterState({
      filter: valueChar
    })
    navigate(`${RoutePath.PRODUCTS}`)
  }
  return (
    <>
      {!characteristics &&
      <div className={'text-center w-full m-auto'}>
        Характеристик для продукта не добавлено:(
      </div>
      }
      {characteristics && characteristics.map(sect => (
        <span key={sect.sectionId}>
        <div>
        <div className={style.sectionName}>
          {sect.sectionName}
        </div>
            <div className={style.containerSection}>
              {sect.characteristics?.map((char) =>
                  <div
                    key={char.characteristicNameId}
                    className={style.containerCategory}
                  >
            <span className={style.nameChar}>
              {char.characteristicName}
            </span>{': '}
                    {char.values?.map((charValue, i, arr) =>
                      ((i === arr.length - 1)
                        ? <span
                          key={charValue.characteristicValueId}
                          className={style.valueCharSpan}
                        >
                          <NavLink
                            className={style.valueChar}
                            onClick={() => clickFindProductByChar(charValue.characteristicValue)}
                          >
                            {charValue.characteristicValue}
                          </NavLink>
                        </span>
                        : <span
                          key={charValue.characteristicValueId}
                          className={style.valueCharSpan}
                        >
                          <NavLink
                            className={style.valueChar}
                            onClick={() => clickFindProductByChar(charValue.characteristicValue)}
                          >
                          {charValue.characteristicValue}
                        </NavLink>,
                        </span>)
                    )}
                  </div>
              )}
            </div>
      </div>
      </span>
      ))}
    </>
  )
}

export default Characteristics
