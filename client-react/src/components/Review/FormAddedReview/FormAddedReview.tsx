import RatingContext from 'context/RatingContext'
import React, { FC, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useInfoLoading } from 'hooks/useInfoLoading'
import {
  useAddReviewMutation,
  useUpdReviewMutation
} from 'store/myStore/myStoreReview.api'
import { IReview } from 'store/myStore/myStoreReview.interface'
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
}

const FormAddedReview: FC<IFormAddedReview> = ({
  defaultValue,
  changeReview = false
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

  const handleChangeInput =
    ({ target: { name, value }, currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, [name]: value }))
      currentTarget.checkValidity()
    }

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
  }
  return (
    <div className={style.block}>
      <div className={style.blockRating}>
        <RatingContext.Provider value={{ setRating, rating }}>
          <Rating rating={rating} />
        </RatingContext.Provider>
      </div>
      <div className={style.blockForm}>
        <Form
          noValidate
        >
         <InputGroup hasValidation={false} className="mb-2">
           <InputGroup.Text id="basic-addon1">
             <i className="bi bi-chat-left-dots"/>
           </InputGroup.Text>
           <Form.Control
             required
             as={'textarea'}
             onChange={handleChangeInput}
             name={'comment'}
             // isValid={!errors.nickname && !onlyShowInfo}
             // isInvalid={!!errors.nickname}
             placeholder={defaultValue.parentId
               ? 'Введите комментарий'
               : 'Введите отзыв'}
             defaultValue={defaultValue &&
             defaultValue.comment
               ? defaultValue.comment
               : ''}
             aria-label="comment"
             aria-describedby="basic-addon1"
           />
           {/* <Form.Control.Feedback type="invalid"> */}
           {/*   {errors.nickname} */}
           {/* </Form.Control.Feedback> */}
         </InputGroup>
        </Form>
      </div>
      <div className={style.blockButton}>
        <Button variant="success"
                className={'bg-emerald-600 w-full'}
                onClick={btnLogin}
                type={'submit'}
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
