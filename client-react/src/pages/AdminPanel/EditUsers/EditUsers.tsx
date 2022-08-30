import React, { FC, useEffect } from 'react'
import UserProfile from 'components/UserProfile/UserProfile'
import { useAllUsersQuery } from 'store/myStore/myStoreUser.api'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useBreadcrumb } from 'context/BreadcrumbContext'
import { useAppActions } from 'hooks/useStore'
import style from './EditUsers.module.scss'

const EditUsers: FC = () => {
  const { setBreadcrumb } = useBreadcrumb()
  const { changeFilterState } = useAppActions()
  useEffect(() => {
    setBreadcrumb({})
    changeFilterState({})
  }, [])
  const { isLoading, isSuccess, isError, data: users, error } =
    useAllUsersQuery({ limit: 10, page: 1 })
  useInfoLoading({
    isLoading, isSuccess, isError, data: users, error
  })

  return (
    <>
      {isSuccess && users &&
        users.result?.results.map(user =>
        <div
          className={style.containerUser}
          key={user.id}>
          <UserProfile user={user} notShowInfo={true} />
        </div>
        )}
    </>
  )
}

export default EditUsers
