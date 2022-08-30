import React, { FC } from 'react'
import {
  Overlay,
  Popover
} from 'react-bootstrap'
// import style from './MyOverlay.module.scss'

interface IOverlayProps {
  children: React.ReactNode
  target: HTMLElement | HTMLLIElement | HTMLButtonElement | null
  show: boolean
  title: string
  marginLeft?: number
  tabIndex?: number
}

const MyOverlay: FC<IOverlayProps> = ({
  marginLeft,
  // tabIndex,
  title,
  children,
  target,
  show
}) => {
  return (
    target !== null
      ? <Overlay
      target={target}
      flip={true}
      transition={false}
      placement="right"
      show={show}
      offset={[0, marginLeft || 10]}
    >
      <Popover
        id={'popover-contained popover-positioned-right'}
        // tabIndex={tabIndex}
      >
        <Popover.Header as="h3">{title}</Popover.Header>
        <Popover.Body>
          {children}
        </Popover.Body>
      </Popover>
      {/* <div className={`${style.block} w-auto h-auto`}> */}
      {/*   <div className={style.title}> */}
      {/*     {title} */}
      {/*   </div> */}
      {/*   <div className={style.body}> */}
      {/*     {children} */}
      {/*   </div> */}
      {/* </div> */}
    </Overlay>
      : <></>
  )
}

export default MyOverlay
