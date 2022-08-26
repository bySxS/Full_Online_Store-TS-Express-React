import React, { FC, useState } from 'react'
import { IReviewOut } from 'store/myStore/myStoreReview.interface'
import { addHostServerToFileLink } from 'utils'
import dayjs from 'dayjs'
import EditButton from './EditButton/EditButton'
import Rating from './Rating/Rating'
import style from './ReviewItem.module.scss'

interface IReviewItem {
  Review: IReviewOut
}

const ReviewItem: FC<IReviewItem> = ({
  Review
}) => {
  const {
    comment, userId, bought,
    createdAt, flaws, advantages, rating,
    userAvatar, userNickname, userFullName, userRolesId
  } = Review
  const [urlAvatar] = useState(addHostServerToFileLink(userAvatar, userId, 'user_avatar'))
  return (
    <div className={style.blockComment}>
      <div className={style.sectionInfo}>
        <div className={style.avatar}>
          <img
            src={urlAvatar}
            className={style.img}
            alt={userNickname}
          />
        </div>
        <div className={style.info}>
          <span className={`${style.infoNick} ${userRolesId === 1
            ? style.nickAdmin
            : userRolesId === 2
              ? style.nickModer
              : style.nickUser
          }`}>
            {userNickname}
          </span>
          <span>{userFullName}</span>
          {bought === 1 &&
            <span className={style.productBuying}>
              <i className="bi bi-cart-check-fill"/> Товар куплен!
            </span>
          }
          <span>{dayjs(createdAt).format('YYYY.MM.DD')}</span>
          <span>{dayjs(createdAt).format('HH:MM:ss')}</span>
        </div>
      </div>
      <div className={style.sectionComment}>
        <div className={style.message}>
          <Rating rating={rating} />
          <span className={style.messageComment}>
            {comment}
          </span>
          {advantages &&
            <span className={style.messageAdvantages}>
              <b>Плюсы:</b> {advantages}
            </span>
          }
          {flaws &&
            <span className={style.messageFlaws}>
              <b>Минусы:</b> {flaws}
            </span>
          }
        </div>
      <EditButton Review={Review} />
      </div>
    </div>
  )
}

export default ReviewItem
