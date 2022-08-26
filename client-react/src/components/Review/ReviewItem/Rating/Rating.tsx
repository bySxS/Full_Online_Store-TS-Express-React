import React, { FC, useEffect, useState } from 'react'
import { useRating } from 'context/RatingContext'
import style from './Rating.module.scss'

interface IRating {
  rating: number
  className?: string
}

const Rating: FC<IRating> = ({ rating, className }) => {
  const { setRating, rating: changeRating } = useRating()
  const [currRating, setCurrRating] = useState(changeRating !== undefined ? changeRating : rating)

  const clickChangeRating = (idx: number) => {
    if (setRating) {
      setRating(idx)
    }
  }

  useEffect(() => {
    setCurrRating(changeRating !== undefined ? changeRating : rating)
  }, [changeRating, rating])

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
