import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Error404 = () => {
  const navigate = useNavigate()

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
