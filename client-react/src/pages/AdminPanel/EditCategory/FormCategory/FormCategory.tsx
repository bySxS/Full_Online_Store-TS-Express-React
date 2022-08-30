import React, { FC, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import MyInput from 'components/UI/MyInput/MyInput'
import { useInfoLoading } from 'hooks/useInfoLoading'
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation
} from 'store/myStore/myStoreCategory.api'
import style from './FormCategory.module.scss'

export interface IFormCategoryState {
  category?: {
    id?: number
    name?: string
    nameEng?: string
    parentId?: number
    iconClass?: string
  }
  type: 'add' | 'del' | 'upd'
}

interface IFormCategory {
  form?: IFormCategoryState
  onCloseForm?: () => void
}

const FormCategory: FC<IFormCategory> = ({
  form,
  onCloseForm
}) => {
  const [formState, setFormState] = useState<{
    id?: number
    name?: string
    nameEng?: string
    parentId?: number
    iconClass?: string
  }>(form?.category || {
    name: '',
    nameEng: ''
  })
  const [addCat, {
    error: errorAdd,
    data: dataAdd,
    isError: isErrorAdd,
    isLoading: isLoadingAdd,
    isSuccess: isSuccessAdd
  }] = useAddCategoryMutation()
  useInfoLoading({
    error: errorAdd,
    data: dataAdd,
    isError: isErrorAdd,
    isLoading: isLoadingAdd,
    isSuccess: isSuccessAdd
  })
  const [delCat, {
    error: errorDel,
    data: dataDel,
    isError: isErrorDel,
    isLoading: isLoadingDel,
    isSuccess: isSuccessDel
  }] = useDeleteCategoryMutation()
  useInfoLoading({
    error: errorDel,
    data: dataDel,
    isError: isErrorDel,
    isLoading: isLoadingDel,
    isSuccess: isSuccessDel
  })
  const [updCat, {
    error: errorUpd,
    data: dataUpd,
    isError: isErrorUpd,
    isLoading: isLoadingUpd,
    isSuccess: isSuccessUpd
  }] = useUpdateCategoryMutation()
  useInfoLoading({
    error: errorUpd,
    data: dataUpd,
    isError: isErrorUpd,
    isLoading: isLoadingUpd,
    isSuccess: isSuccessUpd
  })
  const clickHandle = () => {
    if (form?.type === 'upd' && formState.id) {
      updCat({
        categoryId: formState.id,
        body: {
          ...formState,
          name: formState.name || '',
          nameEng: formState.nameEng || ''
        }
      })
    }
    if (form?.type === 'add') {
      addCat({
        ...formState,
        name: formState.name || '',
        nameEng: formState.nameEng || ''
      })
    }
    let result = form?.type !== 'del'
    if (form?.type === 'del' && formState.id) {
      result = confirm('Вы уверены что хотите удалить категорию и все подкатегории?')
      if (result) {
        delCat(formState.id)
      }
    }
    if (onCloseForm && result) {
      onCloseForm()
    }
  }
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
            nameInput={'nameEng'}
            value={formState.nameEng}
            label={'Название на английском'}
            setValue={setFormState}
            isValid={(formState.nameEng && formState.nameEng !== '') || false}
            placeholder={'Введите название на английском'}
          />
          <MyInput
            nameInput={'iconClass'}
            value={formState.iconClass}
            label={'Класс icon (не обязательно)'}
            setValue={setFormState}
            isValid={(formState.iconClass && formState.iconClass !== '') || false}
            placeholder={'Введите Класс icon'}
          />
          <MyInput
            nameInput={'parentId'}
            value={formState.parentId}
            label={'Родительская категория'}
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
              disabled={(!formState.name || formState.name === '' || !formState.nameEng || formState.nameEng === '')}
      >
        {form?.type === 'add'
          ? 'Добавить категорию'
          : form?.type === 'upd'
            ? 'Изменить категорию'
            : form?.type === 'del'
              ? 'Удалить категорию'
              : ''}
      </Button>
    </div>
  )
}

export default FormCategory
