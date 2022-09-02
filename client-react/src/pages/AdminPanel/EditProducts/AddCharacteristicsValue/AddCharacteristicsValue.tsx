import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useInfoLoading } from 'hooks/useInfoLoading'
import {
  useDeleteCharacteristicValueMutation,
  useLazyGetAllCharacteristicsNameByCategoryIdQuery,
  useLazyGetCharacteristicProductByIdQuery
} from 'store/myStore/myStoreCharacteristics.api'
import { RoutePath } from 'AppRouter'
import ProductAllCharacteristicsSection
  from 'components/ProductAllCharacteristics/ProductAllCharacteristicsSection'
import { ICharacteristicSection } from 'store/myStore/myStoreCharacteristics.interface'
import MyLink from 'components/UI/MyLink/MyLink'
import { mergeByProperty } from 'utils'
import { IFormStateCharValue } from './FormCharValueEdit'

interface IAddCharacteristicsValue {
  productId: number
  categoryId: number
  showForm?: () => void
  setFormState?: Dispatch<SetStateAction<IFormStateCharValue | undefined>>
}

const AddCharacteristicsValue: FC<IAddCharacteristicsValue> = ({
  productId,
  categoryId,
  showForm,
  setFormState
}) => {
  const [characteristics, setCharacteristics] = useState<ICharacteristicSection[]>()
  const [getCharName, {
    error: errorName,
    data: dataName,
    isError: isErrorName,
    isLoading: isLoadingName,
    isSuccess: isSuccessName
  }] = useLazyGetAllCharacteristicsNameByCategoryIdQuery()
  useInfoLoading({
    error: errorName,
    data: dataName,
    isError: isErrorName,
    isLoading: isLoadingName,
    isSuccess: isSuccessName
  })
  const [getCharValue, {
    error: errorValue,
    data: dataValue,
    isError: isErrorValue,
    isLoading: isLoadingValue,
    isSuccess: isSuccessValue
  }] = useLazyGetCharacteristicProductByIdQuery()
  useInfoLoading({
    error: errorValue,
    data: dataValue,
    isError: isErrorValue,
    isLoading: isLoadingValue,
    isSuccess: isSuccessValue
  })
  const [delCharValue, {
    error: errorDel,
    data: dataDel,
    isError: isErrorDel,
    isLoading: isLoadingDel,
    isSuccess: isSuccessDel
  }] = useDeleteCharacteristicValueMutation()
  useInfoLoading({
    error: errorDel,
    data: dataDel,
    isError: isErrorDel,
    isLoading: isLoadingDel,
    isSuccess: isSuccessDel
  })
  useEffect(() => {
    getCharName({ alsoParents: true, categoryId })
    getCharValue(productId)
  }, [])

  const onClickDelete = (
    characteristicsValueId: number,
    valueName: string
  ) => {
    const result = confirm(`Вы уверены что хотите удалить значение - ${valueName}?`)
    if (result) {
      delCharValue({ productId, characteristicsValueId })
    }
  }
  const onClickAdd = (
    characteristicsNameId: number,
    characteristicsName: string
  ) => {
    if (setFormState) {
      setFormState({
        title: 'Добавление значения характеристики ' + characteristicsName,
        type: 'add',
        body: {
          characteristicsNameId,
          productId
        }
      })
    }
    if (showForm) {
      showForm()
    }
    // const value = prompt('Введите значение для характеристики ' + characteristicsName, '')
    // if (value && value.length > 0) {
    //   addCharValue({ productId, characteristicsNameId, value })
    // }
  }
  const onClickUpd = (
    characteristicsValueId: number,
    characteristicsValue: string,
    characteristicsName: string,
    characteristicsNameId: number
  ) => {
    if (setFormState) {
      setFormState({
        title: 'Изменяем значения характеристики ' + characteristicsName,
        type: 'upd',
        body: {
          characteristicsValueId,
          productId,
          characteristicsNameId
        }
      })
    }
    if (showForm) {
      showForm()
    }
    // const value = prompt('Введите значение для характеристики ' + characteristicsName, characteristicsValue)
    // if (value && value.length > 0) {
    //   updCharValue({ productId, characteristicsValueId, value })
    // }
  }

  useEffect(() => {
    if (isSuccessName && dataName && dataName.result && isSuccessValue && dataValue) {
      if (dataValue.result) {
        const merge = mergeByProperty([dataName.result, dataValue.result])
        setCharacteristics(merge as ICharacteristicSection[])
      } else {
        setCharacteristics(dataName.result)
      }
    }
  }, [isSuccessValue, isSuccessName, dataValue, dataName])

  return (
    <>
      {!characteristics &&
        <div className={'text-center w-full m-auto'}>
          Названий характеристик для её категорий и её секций не добавлено:(
          <br/>
          <MyLink
            to={RoutePath.EDIT_CHARACTERISTICS}
            className={'text-xl'}
          >
            <i className={'bi bi-plus-circle-fill pr-1'}/>
            Добавить
          </MyLink>
        </div>
      }
      {characteristics &&
        <ProductAllCharacteristicsSection
          characteristics={characteristics}
          onClickAddCharValue={onClickAdd}
          onClickUpdCharValue={onClickUpd}
          onClickDelete={onClickDelete}
        />
      }
      {/* {showForm && formState && */}
      {/*   <ModalComponent */}
      {/*     title={'Редактируем характеристики ' + formState?.title} */}
      {/*     onClose={() => { */}
      {/*       setShowForm(!showForm) */}
      {/*       if (onClose) { */}
      {/*         onClose() */}
      {/*       } */}
      {/*     } */}
      {/*     } */}
      {/*     show={showForm} */}
      {/*     size={'xl'} */}
      {/*     center={true} */}
      {/*   > */}
      {/*   <FormCharValueEdit */}
      {/*     payload={formState} */}
      {/*   /> */}
      {/*   </ModalComponent> */}
      {/* } */}
    </>
  )
}

export default AddCharacteristicsValue
