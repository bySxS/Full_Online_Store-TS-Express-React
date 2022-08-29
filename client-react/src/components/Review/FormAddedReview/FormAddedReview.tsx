import React, { FC, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useInfoLoading } from 'hooks/useInfoLoading'
import {
  useAddReviewMutation,
  useUpdReviewMutation
} from 'store/myStore/myStoreReview.api'
import { IReview } from 'store/myStore/myStoreReview.interface'
import MyInput from 'components/UI/MyInput/MyInput'
import Rating from '../ReviewItem/Rating/Rating'
import style from './FormAddedReview.module.scss'

interface IReviewDefault {
  productId: number
  comment?: string
  // недостатки
  flaws?: string
  // плюсы
  advantages?: string
  rating?: number
  // ответить кому-то
  parentId?: number
}

interface IFormAddedReview {
  defaultValue: IReviewDefault
  changeReview?: boolean
  onClose?: () => void
}

const FormAddedReview: FC<IFormAddedReview> = ({
  defaultValue,
  changeReview = false,
  onClose
}) => {
  const [addReview, {
    isLoading: isLoadingAdd,
    isSuccess: isSuccessAdd,
    isError: isErrorAdd,
    data: dataAdd,
    error: errorAdd
  }] = useAddReviewMutation()
  const [updReview, {
    isLoading: isLoadingUpd,
    isSuccess: isSuccessUpd,
    isError: isErrorUpd,
    data: dataUpd,
    error: errorUpd
  }] = useUpdReviewMutation()
  useInfoLoading({
    isLoading: isLoadingAdd,
    isSuccess: isSuccessAdd,
    isError: isErrorAdd,
    data: dataAdd,
    error: errorAdd
  })
  useInfoLoading({
    isLoading: isLoadingUpd,
    isSuccess: isSuccessUpd,
    isError: isErrorUpd,
    data: dataUpd,
    error: errorUpd
  })
  const [rating, setRating] = useState((defaultValue && defaultValue.rating ? defaultValue.rating : 0))
  const [formState, setFormState] = useState<IReview>({
    productId: (defaultValue && defaultValue.productId ? defaultValue.productId : 0),
    comment: (defaultValue && defaultValue.comment ? defaultValue.comment : ''),
    rating: (defaultValue && defaultValue.rating ? defaultValue.rating : 0),
    advantages: (defaultValue && defaultValue.advantages ? defaultValue.advantages : ''),
    flaws: (defaultValue && defaultValue.flaws ? defaultValue.flaws : ''),
    parentId: (defaultValue && defaultValue.parentId ? defaultValue.parentId : undefined)
  })

  useEffect(() => {
    setFormState((prev) => ({ ...prev, rating }))
  }, [rating])

  useEffect(() => {
    if ((dataAdd && dataAdd.success && dataAdd.success === true) ||
      (dataUpd && dataUpd.success && dataUpd.success === true)) {
      setFormState({
        ...formState,
        comment: '',
        advantages: '',
        flaws: '',
        rating: 0
      })
      setRating(0)
    }
  }, [dataUpd, dataAdd])

  const btnLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    // if (!validated) {
    //   return false
    // }
    if (!changeReview) {
      addReview(formState)
    } else if (defaultValue && defaultValue.rating) {
      updReview(formState)
    }
    if (onClose) {
      onClose()
    }
  }
  return (
    <div className={style.block}>
      {!formState.parentId &&
      <div className={style.blockRating}>
        <Rating rating={rating} setRating={setRating} />
      </div>}
      <div className={style.blockForm}>
        <Form
          noValidate
        >
          <MyInput
            placeholder={defaultValue.parentId
              ? 'Введите комментарий'
              : 'Введите отзыв'}
            value={formState.comment}
            nameInput={'comment'}
            setValue={setFormState}
            icon={<i className="bi bi-chat-left-dots"/>}
            type={'textarea'}
          />
          {formState.comment.length > 0 && !formState.parentId &&
            <MyInput
              placeholder={'Введите плюсы'}
              value={formState.advantages}
              nameInput={'advantages'}
              setValue={setFormState}
              icon={<i className="bi bi-plus-circle-fill"/>}
            />
          }
          {formState.comment.length > 0 && !formState.parentId &&
            <MyInput
              placeholder={'Введите минусы'}
              value={formState.flaws}
              nameInput={'flaws'}
              setValue={setFormState}
              icon={<i className="bi bi-dash-circle-fill"/>}
            />
          }
        </Form>
      </div>
      <div className={style.blockButton}>
        <Button variant="success"
                className={'bg-emerald-600 w-full'}
                onClick={btnLogin}
                type={'submit'}
                disabled={formState.comment.length < 10}
        >
          {changeReview
            ? 'Изменить отзыв'
            : 'Оставить отзыв'
          }
        </Button>
      </div>
    </div>
  )
}

export default FormAddedReview
