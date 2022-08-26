import React, { FC } from 'react'
import { IReviewOut } from 'store/myStore/myStoreReview.interface'
import ReviewItem from '../ReviewItem/ReviewItem'

interface IReviewItemsRecurs {
  reviews: IReviewOut[]
}

const ReviewItemsRecurs: FC<IReviewItemsRecurs> = ({ reviews }) => {
  return (
    <>
    <div className={'pl-2'}>
      {reviews.map(review =>
        (review.child && review.child.length > 0)
          ? <span key={review.id}>
          <ReviewItem comment={review} key={review.id} />
          <ReviewItemsRecurs reviews={review.child} />
          </span>
          : <span key={review.id}>
            <ReviewItem comment={review} key={review.id} />
          </span>
      )}
    </div>

    </>
  )
}

export default ReviewItemsRecurs
