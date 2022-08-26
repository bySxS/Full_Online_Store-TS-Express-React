import React, { FC, useEffect, useState } from 'react'
import { useGetAllReviewByProductIdQuery } from 'store/myStore/myStoreReview.api'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { IResultList } from 'store/myStore/myStore.interface'
import { IReviewOut } from 'store/myStore/myStoreReview.interface'
import { useAuth } from 'hooks/useAuth'
import FormAddedReview from './FormAddedReview/FormAddedReview'
import style from './Review.module.scss'
import ReviewItemsRecurs from './ReviewItemsRecurs/ReviewItemsRecurs'

interface IReview {
  productId: number
}

const Review: FC<IReview> = ({ productId }) => {
  const {
    isLoading, isSuccess, isError, data, error
  } = useGetAllReviewByProductIdQuery({
    productId,
    limit: 0,
    page: 1
    // sort: sort ? 'asc' : 'desc'
  })
  // const [sort, setSort] = useState<boolean>(true)
  useInfoLoading({ isLoading, isSuccess, isError, data, error })
  const [review, setReview] = useState<IResultList<IReviewOut>>()
  const { isAuth } = useAuth()

  useEffect(() => {
    if (isSuccess && data) {
      setReview(data.result)
    }
  }, [isSuccess, data])

  return (
    <div>
      <div className={style.navigate}>
        <div>
          {/* <Button */}
          {/*   onClick={() => setSort(!sort)} */}
          {/* >Sort</Button> */}
        </div>
        <div>
          Комментарии / Отзыва ({review?.total})
        </div>
      </div>
      <div className={style.comments}>
        {review && review.total > 0
          ? <ReviewItemsRecurs
            first={true}
            reviews={review.results}
          />
          : <div>Отзывов нет, Будь первым!</div>
        }
      </div>
      <div className={style.addForm}>
        {isAuth
          ? <FormAddedReview defaultValue={{ productId }} />
          : <div className={'text-center'}>
            Авторизируйтесь чтобы оставлять комментарии!
        </div>
        }
      </div>
    </div>
  )
}

export default Review
