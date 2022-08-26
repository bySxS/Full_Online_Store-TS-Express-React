import React, { FC } from 'react'
import { NavLink } from 'react-bootstrap'
import { IReviewOut } from 'store/myStore/myStoreReview.interface'
import { useAuth } from 'hooks/useAuth'
import style from './EditButton.module.scss'

interface IEditButton {
  Review: IReviewOut
}

const EditButton: FC<IEditButton> = ({
  Review: {
    userId, rating
  }
}) => {
  const { isAdmin, myId, isAuth } = useAuth()
  return (
    <>
      {isAuth &&
        <div className={style.buttonReply}>
          [{myId !== userId &&
          <span className={style.blockLink}>
              <NavLink
                onClick={() => {}}
                className={style.link}
              >
              Ответить
              </NavLink>
            </span>}
          {(myId === userId &&
              rating >= 1) &&
            <span className={style.blockLink}>
                <NavLink
                  onClick={() => {}}
                  className={style.link}
                >
                  Изменить отзыв
                </NavLink>
              </span>}{isAdmin &&
          <span className={style.blockLink}>
              <NavLink
                onClick={() => {}}
                className={style.link}
              >
                Удалить
              </NavLink>
            </span>}]
        </div>
      }
    </>
  )
}

export default EditButton
