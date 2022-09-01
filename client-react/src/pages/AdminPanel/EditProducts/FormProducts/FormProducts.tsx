import React, { FC, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { IProduct, IProductIn } from 'store/myStore/myStoreProduct.interface'
import { useAuth, useProducts } from 'hooks/useSelectors'
import { useDebounce } from 'hooks/useDebounce'
import { useInfoLoading } from 'hooks/useInfoLoading'
import {
  useAddProductMutation,
  useUpdateProductMutation
} from 'store/myStore/myStoreProduct.api'
import { validateProduct } from 'utils/validator'
import MyInput from 'components/UI/MyInput/MyInput'
import MySelect from 'components/UI/MySelect/MySelect'
import { useGetAllTypePriceQuery } from 'store/myStore/myStorePrice.api'
import { ITypePrice } from 'store/myStore/myStorePrice.interface'
import MyCheckbox from 'components/UI/MyCheckbox/MyCheckbox'
import MyFile from 'components/UI/MyFile/MyFile'

interface IFormProducts {
  defaultValue?: IProduct
  onCloseWindow?: () => void
}

const FormProducts: FC<IFormProducts> = ({
  defaultValue,
  onCloseWindow
}) => {
  const { myId } = useAuth()
  const { categoryList } = useProducts()
  const [priceType, setPriceType] = useState<ITypePrice[]>([])
  const [isChangeProduct] = useState((defaultValue && defaultValue.id && defaultValue.id > 0) || false)
  const [formState, setFormState] = useState<IProductIn>({
    title: defaultValue?.title || '',
    description: defaultValue?.description || '',
    categoryId: defaultValue?.categoryId || 0,
    availability: defaultValue?.availability === 1,
    count: defaultValue?.count || 1,
    url: defaultValue?.url || '',
    price: defaultValue?.price || 0,
    priceTypeId: defaultValue?.priceTypeId || 1,
    userId: defaultValue?.userId || myId
  })
  const formStateDebounce = useDebounce(formState)
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState<{
    title?: string
    description?: string
    categoryId?: string
    url?: string
    price?: string
    priceTypeId?: string
    userId?: string
  }>({})
  const [addProduct, {
    error: errorAdd,
    data: dataAdd,
    isError: isErrorAdd,
    isLoading: isLoadingAdd,
    isSuccess: isSuccessAdd
  }] = useAddProductMutation()
  useInfoLoading({
    error: errorAdd,
    data: dataAdd,
    isError: isErrorAdd,
    isLoading: isLoadingAdd,
    isSuccess: isSuccessAdd
  })
  const [updProduct, {
    error: errorUpd,
    data: dataUpd,
    isError: isErrorUpd,
    isLoading: isLoadingUpd,
    isSuccess: isSuccessUpd
  }] = useUpdateProductMutation()
  useInfoLoading({
    error: errorUpd,
    data: dataUpd,
    isError: isErrorUpd,
    isLoading: isLoadingUpd,
    isSuccess: isSuccessUpd
  })
  const {
    error: errorPrice,
    data: dataPrice,
    isError: isErrorPrice,
    isLoading: isLoadingPrice,
    isSuccess: isSuccessPrice
  } = useGetAllTypePriceQuery('')
  useInfoLoading({
    error: errorPrice,
    data: dataPrice,
    isError: isErrorPrice,
    isLoading: isLoadingPrice,
    isSuccess: isSuccessPrice
  })
  useEffect(() => {
    if (isSuccessPrice && dataPrice) {
      setPriceType(dataPrice?.result?.results)
    }
  }, [isSuccessPrice, dataPrice])

  const btnAddEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (!validated) {
      return false
    }
    const formData = new FormData()
    formData.append('title', formState.title)
    formData.append('categoryId', String(formState.categoryId))
    formData.append('userId', String(formState.userId))
    formData.append('description', formState.description)
    formData.append('count', String(formState.count))
    formData.append('price', String(formState.price))
    formData.append('priceTypeId', String(formState.priceTypeId))
    formData.append('availability', formState.availability ? 'True' : 'False')
    if (formState.screen) {
      formData.append('screen', formState.screen)
    }
    if (formState.image1) {
      formData.append('image1', formState.image1)
    }
    if (formState.image2) {
      formData.append('image2', formState.image2)
    }
    if (formState.image3) {
      formData.append('image3', formState.image3)
    }
    if (formState.image4) {
      formData.append('image4', formState.image4)
    }
    if (formState.image5) {
      formData.append('image5', formState.image5)
    }
    if (formState.image6) {
      formData.append('image6', formState.image6)
    }
    if (formState.image7) {
      formData.append('image7', formState.image7)
    }
    if (formState.image8) {
      formData.append('image8', formState.image8)
    }
    if (formState.image9) {
      formData.append('image9', formState.image9)
    }
    if (formState.image10) {
      formData.append('image10', formState.image10)
    }
    if (formState.delScreen) {
      formData.append('delScreen', formState.delScreen ? 'True' : 'False')
    }
    if (formState.delImage1) {
      formData.append('delImage1', formState.delImage1 ? 'True' : 'False')
    }
    if (formState.delImage2) {
      formData.append('delImage2', formState.delImage2 ? 'True' : 'False')
    }
    if (formState.delImage3) {
      formData.append('delImage3', formState.delImage3 ? 'True' : 'False')
    }
    if (formState.delImage4) {
      formData.append('delImage4', formState.delImage4 ? 'True' : 'False')
    }
    if (formState.delImage5) {
      formData.append('delImage5', formState.delImage5 ? 'True' : 'False')
    }
    if (formState.delImage6) {
      formData.append('delImage6', formState.delImage6 ? 'True' : 'False')
    }
    if (formState.delImage7) {
      formData.append('delImage7', formState.delImage7 ? 'True' : 'False')
    }
    if (formState.delImage8) {
      formData.append('delImage8', formState.delImage8 ? 'True' : 'False')
    }
    if (formState.delImage9) {
      formData.append('delImage9', formState.delImage9 ? 'True' : 'False')
    }
    if (formState.delImage10) {
      formData.append('delImage10', formState.delImage10 ? 'True' : 'False')
    }
    if (formState.videoYoutubeUrl) {
      formData.append('videoYoutubeUrl', formState.videoYoutubeUrl)
    }
    if (formState.parentId) {
      formData.append('parentId', String(formState.parentId))
    }
    if (formState.url) {
      formData.append('url', formState.url)
    }

    if (defaultValue && defaultValue.id && defaultValue.id > 0) {
      updProduct({
        productId: defaultValue.id,
        body: formData
      })
    } else {
      addProduct(formData)
    }
  }

  useEffect(() => {
    const result = validateProduct({
      title: formState.title
    })
    setValidated(result.success)
    setErrors(result.errors)
  }, [formStateDebounce])

  useEffect(() => {
    if (onCloseWindow &&
      ((isSuccessAdd && dataAdd) ||
        (isSuccessUpd && dataUpd))) {
      // navigate('/')
      onCloseWindow()
    }
  }, [isSuccessAdd, isSuccessUpd])

  return (
    <div>
      <div className={'text-left w-full'}>
        <Form
          noValidate
        >
          <MyInput
            nameInput={'title'}
            value={formState.title}
            placeholder={'Введите название продукта'}
            label={'Название продукта'}
            setValue={setFormState}
            textError={errors.title}
            isValid={!errors.title}
          />
          <MySelect
            name={'categoryId'}
            valuesOption={categoryList.map(cat => ({
              value: cat.id || 0,
              name: cat.name
            }))}
            defaultValue={formState.categoryId}
            setValue={setFormState}
            label={'Категория продукта'}
          />
          <MyInput
            nameInput={'description'}
            value={formState.description}
            placeholder={'Введите описание продукта'}
            label={'Описание продукта'}
            setValue={setFormState}
            textError={errors.description}
            isValid={!errors.description}
            type={'textarea'}
            sizeTextareaPx={250}
          />
          <MyInput
            placeholder={'Введите количество продуктов на складе'}
            label={'Количество продуктов на складе'}
            value={formState.count}
            nameInput={'count'}
            setValue={setFormState}
            isValid={!!formState.count}
          />
          <MyInput
            placeholder={'Введите цену продукта'}
            label={'Цена продукта'}
            value={formState.price}
            nameInput={'price'}
            setValue={setFormState}
            isValid={!!formState.price}
          />
          <MySelect
            name={'priceTypeId'}
            valuesOption={priceType.map(price => ({
              value: price.id,
              name: price.name
            }))}
            label={'Выберите тип цены'}
            setValue={setFormState}
            defaultValue={formState.priceTypeId}
          />
          <MyCheckbox
            label={'Товар доступный?'}
            name={'availability'}
            value={formState.availability}
            setValue={setFormState}
          />
          <div className={'flex items-end w-full'}>
            <div className={'w-1/2'}>
              <MyFile
              name={'screen'}
              label={'Скриншот продукта'}
              setValue={setFormState}
            />
            </div>
            <div className={'pl-3'}>
              {defaultValue && defaultValue.screen &&
              <MyCheckbox
                label={'Удалить скриншот?'}
                name={'delScreen'}
                value={formState.delScreen}
                setValue={setFormState}
              />
            }
            </div>
          </div>

          <div className={'flex items-end w-full'}>
            <div className={'w-1/2'}>
              <MyFile
                name={'image1'}
                label={'Доп.изображение #1 продукта'}
                setValue={setFormState}
              />
            </div>
            <div className={'pl-3'}>
              {defaultValue && defaultValue.image1 &&
                <MyCheckbox
                  label={'Удалить доп.изображение #1 продукта?'}
                  name={'delImage1'}
                  value={formState.delImage1}
                  setValue={setFormState}
                />
              }
            </div>
          </div>

          <div className={'flex items-end w-full'}>
            <div className={'w-1/2'}>
              <MyFile
                name={'image2'}
                label={'Доп.изображение #2 продукта'}
                setValue={setFormState}
              />
            </div>
            <div className={'pl-3'}>
              {defaultValue && defaultValue.image2 &&
                <MyCheckbox
                  label={'Удалить доп.изображение #2 продукта?'}
                  name={'delImage2'}
                  value={formState.delImage2}
                  setValue={setFormState}
                />
              }
            </div>
          </div>

          <div className={'flex items-end w-full'}>
            <div className={'w-1/2'}>
              <MyFile
                name={'image3'}
                label={'Доп.изображение #3 продукта'}
                setValue={setFormState}
              />
            </div>
            <div className={'pl-3'}>
              {defaultValue && defaultValue.image3 &&
                <MyCheckbox
                  label={'Удалить доп.изображение #3 продукта?'}
                  name={'delImage3'}
                  value={formState.delImage3}
                  setValue={setFormState}
                />
              }
            </div>
          </div>

            <div className={'flex items-end w-full'}>
              <div className={'w-1/2'}>
                <MyFile
                  name={'image4'}
                  label={'Доп.изображение #4 продукта'}
                  setValue={setFormState}
                />
              </div>
              <div className={'pl-3'}>
                {defaultValue && defaultValue.image4 &&
                  <MyCheckbox
                    label={'Удалить доп.изображение #4 продукта?'}
                    name={'delImage4'}
                    value={formState.delImage4}
                    setValue={setFormState}
                  />
                }
              </div>
            </div>

          <div className={'flex items-end w-full'}>
            <div className={'w-1/2'}>
              <MyFile
                name={'image5'}
                label={'Доп.изображение #5 продукта'}
                setValue={setFormState}
              />
            </div>
            <div className={'pl-3'}>
              {defaultValue && defaultValue.image5 &&
                <MyCheckbox
                  label={'Удалить доп.изображение #5 продукта?'}
                  name={'delImage5'}
                  value={formState.delImage5}
                  setValue={setFormState}
                />
              }
            </div>
          </div>

          <div className={'flex items-end w-full'}>
            <div className={'w-1/2'}>
              <MyFile
                name={'image6'}
                label={'Доп.изображение #6 продукта'}
                setValue={setFormState}
              />
            </div>
            <div className={'pl-3'}>
              {defaultValue && defaultValue.image6 &&
                <MyCheckbox
                  label={'Удалить доп.изображение #6 продукта?'}
                  name={'delImage6'}
                  value={formState.delImage6}
                  setValue={setFormState}
                />
              }
            </div>
          </div>

          <div className={'flex items-end w-full'}>
            <div className={'w-1/2'}>
              <MyFile
                name={'image7'}
                label={'Доп.изображение #7 продукта'}
                setValue={setFormState}
              />
            </div>
            <div className={'pl-3'}>
              {defaultValue && defaultValue.image7 &&
                <MyCheckbox
                  label={'Удалить доп.изображение #7 продукта?'}
                  name={'delImage7'}
                  value={formState.delImage7}
                  setValue={setFormState}
                />
              }
            </div>
          </div>

          <div className={'flex items-end w-full'}>
            <div className={'w-1/2'}>
              <MyFile
                name={'image8'}
                label={'Доп.изображение #8 продукта'}
                setValue={setFormState}
              />
            </div>
            <div className={'pl-3'}>
              {defaultValue && defaultValue.image8 &&
                <MyCheckbox
                  label={'Удалить доп.изображение #8 продукта?'}
                  name={'delImage8'}
                  value={formState.delImage8}
                  setValue={setFormState}
                />
              }
            </div>
          </div>

          <div className={'flex items-end w-full'}>
            <div className={'w-1/2'}>
              <MyFile
                name={'image9'}
                label={'Доп.изображение #9 продукта'}
                setValue={setFormState}
              />
            </div>
            <div className={'pl-3'}>
              {defaultValue && defaultValue.image9 &&
                <MyCheckbox
                  label={'Удалить доп.изображение #9 продукта?'}
                  name={'delImage9'}
                  value={formState.delImage9}
                  setValue={setFormState}
                />
              }
            </div>
          </div>

          <div className={'flex items-end w-full'}>
            <div className={'w-1/2'}>
              <MyFile
                name={'image10'}
                label={'Доп.изображение #10 продукта'}
                setValue={setFormState}
              />
            </div>
            <div className={'pl-3'}>
              {defaultValue && defaultValue.image10 &&
                <MyCheckbox
                  label={'Удалить доп.изображение #10 продукта?'}
                  name={'delImage10'}
                  value={formState.delImage10}
                  setValue={setFormState}
                />
              }
            </div>
          </div>

        <MyInput
          label={'Ссылка обзора на YouTube'}
          placeholder={'Введите ссылку обзора на YouTube'}
          value={formState.videoYoutubeUrl}
          nameInput={'videoYoutubeUrl'}
          setValue={setFormState}
        />
          <MyInput
            label={'ID продукта отца (не обязательно)'}
            placeholder={'Введите ID продукта отца'}
            value={formState.parentId}
            nameInput={'parentId'}
            setValue={setFormState}
          />
          <MyInput
            label={'Желаемый URL продукта (например \'iphone_13pro\')'}
            placeholder={'Введите желаемый URL продукта'}
            value={formState.url}
            nameInput={'url'}
            isValid={!!formState.url}
            setValue={setFormState}
          />
        </Form>
      </div>
      <Button variant="success"
              className={'bg-emerald-600 w-full'}
              onClick={btnAddEdit}
              type={'submit'}
              disabled={!validated}
      >
        {isChangeProduct
          ? 'Сохранить изменения'
          : 'Добавить продукт'
        }
      </Button>
    </div>
  )
}

export default FormProducts
