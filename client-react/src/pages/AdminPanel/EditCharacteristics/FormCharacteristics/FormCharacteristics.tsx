import React, { FC, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import MyInput from 'components/UI/MyInput/MyInput'
import { useInfoLoading } from 'hooks/useInfoLoading'
import {
  useAddCharacteristicNameMutation,
  useDeleteCharacteristicNameMutation,
  useUpdateCharacteristicNameMutation
} from 'store/myStore/myStoreCharacteristics.api'
import {
  ICharacteristicFieldType,
  ICharacteristicName
} from 'store/myStore/myStoreCharacteristics.interface'
import style from './FormCharacteristics.module.scss'

export interface ICharacteristicNameForm {
  id?: number
  name?: string
  categoryId?: number
  fieldType?: ICharacteristicFieldType
  parentId?: number
}

export interface IFormCharacteristicsState {
  body: ICharacteristicNameForm
  type: 'add' | 'del' | 'upd'
  section: boolean
}

interface IFormCharacteristics {
  form: IFormCharacteristicsState
  onCloseForm?: () => void
}

const FormCharacteristics: FC<IFormCharacteristics> = ({
  form,
  onCloseForm
}) => {
  const [formState, setFormState] = useState<ICharacteristicName>(form.body as ICharacteristicName)
  const [add, {
    error: errorAdd,
    data: dataAdd,
    isError: isErrorAdd,
    isLoading: isLoadingAdd,
    isSuccess: isSuccessAdd
  }] = useAddCharacteristicNameMutation()
  useInfoLoading({
    error: errorAdd,
    data: dataAdd,
    isError: isErrorAdd,
    isLoading: isLoadingAdd,
    isSuccess: isSuccessAdd
  })
  const [del, {
    error: errorDel,
    data: dataDel,
    isError: isErrorDel,
    isLoading: isLoadingDel,
    isSuccess: isSuccessDel
  }] = useDeleteCharacteristicNameMutation()
  useInfoLoading({
    error: errorDel,
    data: dataDel,
    isError: isErrorDel,
    isLoading: isLoadingDel,
    isSuccess: isSuccessDel
  })
  const [upd, {
    error: errorUpd,
    data: dataUpd,
    isError: isErrorUpd,
    isLoading: isLoadingUpd,
    isSuccess: isSuccessUpd
  }] = useUpdateCharacteristicNameMutation()
  useInfoLoading({
    error: errorUpd,
    data: dataUpd,
    isError: isErrorUpd,
    isLoading: isLoadingUpd,
    isSuccess: isSuccessUpd
  })
  const clickHandle = () => {
    if (form?.type === 'upd' && formState.id) {
      upd({
        characteristicNameId: formState.id,
        body: formState
      })
    }
    if (form?.type === 'add') {
      add(formState)
    }
    let result = form?.type !== 'del'
    if (form?.type === 'del' && formState.id) {
      result = confirm(`Вы уверены что хотите удалить ${form.section ? 'раздел' : 'название'} характеристики?`)
      if (result) {
        del(formState.id)
      }
    }
  }
  useEffect(() => {
    if (isSuccessDel || isSuccessAdd || isSuccessUpd) {
      if (onCloseForm) {
        setTimeout(() => {
          onCloseForm()
        }, 1000)
      }
    }
  }, [isSuccessDel, isSuccessAdd, isSuccessUpd])
  return (
    <div
      className={style.formBlock}>
      <div className={style.divForm}>
        <Form
          noValidate
        >
          <MyInput
            nameInput={'name'}
            value={formState.name}
            label={'Название'}
            setValue={setFormState}
            isValid={(formState.name && formState.name !== '') || false}
            placeholder={'Введите название'}
          />
          <MyInput
            nameInput={'fieldType'}
            value={formState.fieldType}
            label={'Тип поля, необязательно (select | checkbox | text)'}
            setValue={setFormState}
            disable={form.section}
            isValid={!!formState.fieldType}
            placeholder={'Введите Тип поля'}
          />
          <MyInput
            nameInput={'parentId'}
            value={formState.parentId}
            label={'Раздел характеристики'}
            setValue={setFormState}
            disable={form?.type !== 'upd'}
            placeholder={''}
          />
          <MyInput
            nameInput={'categoryId'}
            value={formState.categoryId}
            label={'ID Категории характеристики'}
            setValue={setFormState}
            disable={form?.type !== 'upd'}
            placeholder={''}
          />
        </Form>
      </div>
      <Button variant="success"
              className={'bg-emerald-600 w-full'}
              onClick={clickHandle}
              type={'submit'}
              disabled={(!formState.name || formState.name === '' || !formState.categoryId)}
      >
        {form?.type === 'add'
          ? `Добавить ${form.section ? 'раздел' : 'название'} характеристики`
          : form?.type === 'upd'
            ? `Изменить ${form.section ? 'раздел' : 'название'} характеристики`
            : form?.type === 'del'
              ? `Удалить ${form.section ? 'раздел' : 'название'} характеристики`
              : ''}
      </Button>
    </div>
  )
}

export default FormCharacteristics
