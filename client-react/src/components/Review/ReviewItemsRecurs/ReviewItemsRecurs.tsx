import React, { FC } from 'react'
import { IReviewOut } from 'store/myStore/myStoreReview.interface'
import ReviewItem from '../ReviewItem/ReviewItem'

interface IReviewItemsRecurs {
  reviews: IReviewOut[]
  first?: boolean
}

const ReviewItemsRecurs: FC<IReviewItemsRecurs> = ({
  reviews,
  first = false
}) => {
  return (
    <>
    <div className={first ? '' : 'pl-4'}>
      {reviews.map(review =>
        (review.child && review.child.length > 0)
          ? <span key={review.id}>
          <ReviewItem Review={review} key={review.id} />
          <ReviewItemsRecurs reviews={review.child} />
          </span>
          : <span key={review.id}>
            <ReviewItem Review={review} key={review.id} />
          </span>
      )}
    </div>

    </>
  )
}

export default ReviewItemsRecurs
