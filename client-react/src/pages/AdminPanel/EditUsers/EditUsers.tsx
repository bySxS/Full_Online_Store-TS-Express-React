import React, { FC, useEffect, useState } from 'react'
import UserProfile from 'components/UserProfile/UserProfile'
import { useSearchParams } from 'react-router-dom'
import { useLazyAllUsersQuery } from 'store/myStore/myStoreUser.api'
import { useInfoLoading } from 'hooks/useInfoLoading'
import Pagination from 'components/Pagination/Pagination'
import { useBreadcrumb } from 'context/BreadcrumbContext'
import style from './EditUsers.module.scss'

const EditUsers: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { setBreadcrumb } = useBreadcrumb()
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
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
    setBreadcrumb({})
  }, [isSuccess, users])

  useEffect(() => {
    const pageP = searchParams.get('page')
    if (pageP && +pageP !== page) {
      setPage(+pageP)
    }
  }, [searchParams])

  const changePage = (currPage: number) => {
    setPage(currPage)
    setSearchParams({ page: String(currPage) }, {
      replace: true
    })
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
          <UserProfile
            key={user.id}
            user={user}
            showInfo={false}
          />
        )}
    </div>
    </>
  )
}

export default EditUsers
