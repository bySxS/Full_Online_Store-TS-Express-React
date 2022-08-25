import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBreadcrumb } from 'context/BreadcrumbContext'

const Error404 = () => {
  const navigate = useNavigate()
  const { setBreadcrumb } = useBreadcrumb()
  useEffect(() => {
    setBreadcrumb({})
  }, [])
  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }, [])

  return (
    <div className={'text-red-600 text-4xl text-center'}>
      Такой страницы не существует
    </div>
  )
}

export default Error404
