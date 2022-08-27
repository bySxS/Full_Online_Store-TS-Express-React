import React, { FC, useState } from 'react'
import { NavLink } from 'react-bootstrap'
import { IReviewOut } from 'store/myStore/myStoreReview.interface'
import { useAuth } from 'hooks/useAuth'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useDeleteReviewMutation } from 'store/myStore/myStoreReview.api'
import { ModalComponent } from 'components/UI/Modal/ModalComponent'
import FormAddedReview from 'components/Review/FormAddedReview/FormAddedReview'
import style from './EditButton.module.scss'

interface IEditButton {
  Review: IReviewOut
}

const EditButton: FC<IEditButton> = ({
  Review: {
    userId,
    productId,
    advantages,
    flaws,
    rating,
    id,
    parentId,
    userNickname,
    comment
  }
}) => {
  const { isAdmin, myId, isAuth } = useAuth()
  const [showModalFormEdit, setModalShowEdit] = useState(false)
  const [showModalFormReply, setModalShowReply] = useState(false)
  const [delReview, {
    isLoading, isSuccess, isError, data, error
  }] = useDeleteReviewMutation()
  useInfoLoading({
    isLoading, isSuccess, isError, data, error
  })
  const clickToggleShowModalEdit = () => {
    setModalShowEdit(!showModalFormEdit)
  }

  const clickToggleShowModalReply = () => {
    setModalShowReply(!showModalFormReply)
  }

  const clickDel = () => {
    const result = confirm('Вы уверены что хотите удалить ' +
      (parentId && parentId > 0 ? 'комментарий' : 'отзыв') + ' пользователя ' +
      userNickname + '?')
    if (result) {
      delReview(id)
    }
  }

  return (
    <>
      {isAuth &&
        <div className={style.buttonReply}>
          [{myId !== userId &&
          <span className={style.blockLink}>
              <NavLink
                onClick={clickToggleShowModalReply}
                className={style.link}
              >
              Ответить
              </NavLink>
            </span>}
          {(myId === userId &&
              rating >= 1) &&
            <span className={style.blockLink}>
                <NavLink
                  onClick={clickToggleShowModalEdit}
                  className={style.link}
                >
                  Изменить отзыв
                </NavLink>
              </span>}{isAdmin &&
          <span className={style.blockLink}>
              <NavLink
                onClick={clickDel}
                className={style.link}
              >
                Удалить
              </NavLink>
            </span>}]
        </div>
      }
      {showModalFormEdit &&
        <ModalComponent
          show={showModalFormEdit}
          title={'Редактировать ваш ' +
            (parentId && parentId > 0 ? 'комментарий' : 'отзыв')}
          onClose={clickToggleShowModalEdit}
          className={'w-[450px]'}
        >
          <FormAddedReview
            defaultValue={{
              productId,
              advantages,
              flaws,
              rating,
              comment,
              parentId
            }}
            changeReview={true}
            onClose={clickToggleShowModalEdit}
          />
        </ModalComponent>
      }
      {showModalFormReply &&
        <ModalComponent
          show={showModalFormReply}
          title={'Ответить пользователю ' + userNickname}
          onClose={clickToggleShowModalReply}
          className={'w-[450px]'}
        >
          <FormAddedReview
            defaultValue={{
              productId,
              parentId: id
            }}
            onClose={clickToggleShowModalReply}
          />
        </ModalComponent>
      }
    </>
  )
}

export default EditButton
