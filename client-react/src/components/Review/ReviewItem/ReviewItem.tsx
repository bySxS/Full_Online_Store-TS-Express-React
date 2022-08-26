import React, { FC, useState } from 'react'
import { NavLink } from 'react-bootstrap'
import { IReviewOut } from 'store/myStore/myStoreReview.interface'
import { addHostServerToFileLink } from 'utils'
import style from './ReviewItem.module.scss'

interface IReviewItem {
  comment: IReviewOut
}

const ReviewItem: FC<IReviewItem> = ({
  comment: {
    comment, userId, bought,
    createdAt, flaws, advantages, rating,
    userAvatar, userNickname, userFullName
  }
}) => {
  const [urlAvatar] = useState(addHostServerToFileLink(userAvatar, userId, 'user_avatar'))
  return (
    <div className={style.blockComment}>
      <div className={style.sectionInfo}>
        <div className={style.avatar}>
          <img src={urlAvatar} className={'w-[70px]'} alt={userNickname} />
        </div>
        <div className={style.info}>
          <span>{userNickname}</span>
          <span>{userFullName}</span>
          {bought === 1 && <span>Товар куплен!</span>}
          <span>{new Date(createdAt).toUTCString()}</span>
        </div>
      </div>
      <div className={style.sectionComment}>
        <div className={style.message}>
          <span>{rating}</span>
          <span>{comment}</span>
          <span>{advantages}</span>
          <span>{flaws}</span>
        </div>
        <div className={style.buttonReply}>
          [<NavLink className={style.link}>
          Ответить
        </NavLink> | <NavLink className={style.link}>
          Изменить
        </NavLink> ]
        </div>
      </div>
    </div>
  )
}

export default ReviewItem
