import React, { ForwardedRef } from 'react'
import style from './DropDownToggle.module.scss'

interface ICustomToggle {
  children: React.ReactNode,
  onClick: (e: React.MouseEvent) => void
}

export const MyDropDownToggle = React.forwardRef(({
  children,
  onClick
}: ICustomToggle,
ref: ForwardedRef<HTMLAnchorElement>) => (
  <a
    href=""
    ref={ref}
    className={style.buttonToggle}
    onClick={(e) => {
      e.preventDefault()
      onClick(e)
    }}
  >
    {children}
  </a>
))
MyDropDownToggle.displayName = 'MyDropDownToggle'

interface ICustomMenu {
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
  'aria-labelledby': string
}

export const MyDropDownMenu = React.forwardRef((
  {
    children,
    style,
    className,
    'aria-labelledby': labeledBy
  }: ICustomMenu,
  ref: ForwardedRef<HTMLDivElement>) => {
  return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled">
          {children}
        </ul>
      </div>
  )
}
)
MyDropDownMenu.displayName = 'CustomMenu'
