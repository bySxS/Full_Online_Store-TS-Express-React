import React, { Dispatch, FC, SetStateAction } from 'react'
import style from './Rating.module.scss'

interface IRating {
  rating: number
  className?: string
  setRating?: Dispatch<SetStateAction<number>>
}

const Rating: FC<IRating> = ({
  rating: currRating,
  className,
  setRating
}) => {
  const clickChangeRating = (idx: number) => {
    if (setRating) {
      setRating(idx)
    }
  }
  return (
    <span className={style.rating}>
      {(currRating || setRating) && <span className={className}>
        <i
          onClick={() => clickChangeRating(1)}
          className={`bi ${currRating >= 1
            ? 'bi-star-fill'
            : 'bi-star'} ${setRating
            ? 'hover:opacity-70'
            : ''} ${style.stars}`}/>
        <i
          onClick={() => clickChangeRating(2)}
          className={`bi ${currRating >= 2
            ? 'bi-star-fill'
            : 'bi-star'} ${setRating
            ? 'hover:opacity-70'
            : ''} ${style.stars}`}/>
        <i
          onClick={() => clickChangeRating(3)}
          className={`bi ${currRating >= 3
            ? 'bi-star-fill'
            : 'bi-star'} ${setRating
            ? 'hover:opacity-70'
            : ''} ${style.stars}`}/>
        <i
          onClick={() => clickChangeRating(4)}
          className={`bi ${currRating >= 4
            ? 'bi-star-fill'
            : 'bi-star'} ${setRating
            ? 'hover:opacity-70'
            : ''} ${style.stars}`}/>
        <i
          onClick={() => clickChangeRating(5)}
          className={`bi ${currRating >= 5
            ? 'bi-star-fill'
            : 'bi-star'} ${setRating
            ? 'hover:opacity-70'
            : ''} ${style.stars}`}/>
        </span>
      }
    </span>
  )
}

export default Rating
