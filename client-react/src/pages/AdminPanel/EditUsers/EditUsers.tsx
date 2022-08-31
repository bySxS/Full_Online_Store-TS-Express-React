import React, { FC, useEffect, useState } from 'react'
import UserProfile from 'components/UserProfile/UserProfile'
import { useLazyAllUsersQuery } from 'store/myStore/myStoreUser.api'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useBreadcrumb } from 'context/BreadcrumbContext'
import { useAppActions } from 'hooks/useStore'
import Pagination from 'components/Pagination/Pagination'
import style from './EditUsers.module.scss'

const EditUsers: FC = () => {
  const { setBreadcrumb } = useBreadcrumb()
  const { changeFilterState } = useAppActions()
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  useEffect(() => {
    setBreadcrumb({})
    changeFilterState({})
  }, [])
  const [getUsers, {
    isLoading, isSuccess, isError, data: users, error
  }] =
    useLazyAllUsersQuery()
  useInfoLoading({
    isLoading, isSuccess, isError, data: users, error
  })

  useEffect(() => {
    getUsers({ limit: 10, page })
  }, [page])

  useEffect(() => {
    if (isSuccess && users) {
      setTotalPage(users.result.totalPage)
    }
  }, [isSuccess, users])

  const changePage = (currPage: number) => {
    setPage(currPage)
  }

  return (
    <>
      <div className={style.posPagination}>
    <Pagination
      totalPage={totalPage}
      page={page}
      onChangePage={changePage}
    />
      </div>
    <div
      className={style.containerUser}
    >
      {isSuccess && users &&
        users.result?.results.map(user =>
          <UserProfile key={user.id} user={user} showInfo={false} />
        )}
    </div>
    </>
  )
}

export default EditUsers
