import React, { FC } from 'react'
import { useLazyGetAllReviewByProductIdQuery } from 'store/myStore/myStoreReview.api'

interface IReview {
  productId: number
}

const Review: FC<IReview> = ({ productId }) => {
  const [getReview, {
  
  }] = useLazyGetAllReviewByProductIdQuery()
  return (
    <div>
     Комментарии
    </div>
  )
}

export default Review
