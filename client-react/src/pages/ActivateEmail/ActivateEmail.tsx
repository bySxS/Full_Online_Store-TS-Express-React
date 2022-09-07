import React, { FC, useEffect } from 'react'
import { useAppActions, useAppSelector } from 'hooks/useStore'
import { Helmet } from 'react-helmet'
import { useNavigate, useParams } from 'react-router-dom'
import selectUser from 'store/user/user.selector'
import { useLazyActivateEmailQuery } from 'store/myStore/myStoreUser.api'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useBreadcrumb } from 'context/BreadcrumbContext'
import { IMessage } from '../../store/myStore/myStore.interface'

interface ILinkParams {
  [link: string]: string
}

interface ActivateEmailProps {
  name: string
}

const ActivateEmail: FC<ActivateEmailProps> = ({ name }) => {
  const { link } = useParams<ILinkParams>()
  const navigate = useNavigate()
  const { addToAlertStack, changeFilterState } = useAppActions()
  const { setBreadcrumb } = useBreadcrumb()
  useEffect(() => {
    setBreadcrumb({
      moduleName: 'Активация e-mail',
      moduleLink: '/'
    })
    changeFilterState({})
  }, [])
  const userIsActivated = useAppSelector(selectUser.userIsActivated)
  const [activateEmail, {
    isLoading, isSuccess, isError, data, error
  }] = useLazyActivateEmailQuery()
  useInfoLoading({
    isLoading, isSuccess, isError, data, error
  })

  useEffect(() => {
    if (userIsActivated) {
      addToAlertStack({
        message: 'У вас уже активирована учетная запись',
        status: 'warning'
      })
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } else if (!link) {
      addToAlertStack({
        message: 'Неверенная ссылка активации',
        status: 'warning'
      })
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } else {
      activateEmail(link)
    }
  }, [])

  useEffect(() => {
    if (isSuccess || isError) {
      setTimeout(() => {
        navigate('/')
      }, 5000)
    }
  }, [isSuccess, isError])

  return (
    <>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content={name}/>
      </Helmet>
    {isSuccess && data && data.message &&
     <div className={'text-5xl text-center text-green-700'}>
       {data.message}
     </div>
    }
      {(isError && (error &&
          'status' in error &&
          'data' in error)) &&
        <div className={'text-5xl text-center text-red-700'}>
          {String((error.data as IMessage<null>).message)}
        </div>
      }
    </>
  )
}

export default ActivateEmail
