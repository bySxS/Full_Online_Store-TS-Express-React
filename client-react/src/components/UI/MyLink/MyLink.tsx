import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './MyLink.module.scss'

interface IMyButton {
  children: React.ReactNode
  onClick?: () => void
  to?: string
  className?: string
}

const MyLink: FC<IMyButton> = ({
  children,
  onClick,
  to,
  className
}) => {
  const navigate = useNavigate()
  const clickHandle = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (to) {
      navigate(to)
    } else if (onClick) {
      onClick()
    }
  }

  return (
    <a
      href=""
      className={className || style.link}
      onClick={clickHandle}
    >
      {children}
    </a>
  )
}

export default MyLink
