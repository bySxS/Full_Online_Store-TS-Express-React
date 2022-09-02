import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetCharacteristicProductByIdQuery } from 'store/myStore/myStoreCharacteristics.api'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { ICharacteristicSection } from 'store/myStore/myStoreCharacteristics.interface'
import { useAppActions } from 'hooks/useStore'
import { RoutePath } from 'AppRouter'
import ProductAllCharacteristicsSection from 'components/ProductAllCharacteristics/ProductAllCharacteristicsSection'

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
      {characteristics &&
      <ProductAllCharacteristicsSection
        characteristics={characteristics}
        onClickFindProduct={clickFindProductByChar}
      />
      }
    </>
  )
}

export default Characteristics
