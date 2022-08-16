import React, { FC } from 'react'
import { Overlay, Popover } from 'react-bootstrap'

interface IOverlayProps {
  children: React.ReactNode
  target: HTMLElement | HTMLLIElement | HTMLButtonElement | null
  show: boolean
  title: string
  marginLeft?: number
  tabIndex?: number
}

const MyOverlay: FC<IOverlayProps> = ({ marginLeft, tabIndex, title, children, target, show }) => {
  return (
    target !== null
      ? <Overlay
      target={target}
      flip={true}
      placement="right"
      show={show}
      offset={[0, marginLeft || 10]}
    >
      <Popover id={'popover-positioned-right'}
               tabIndex={tabIndex}
               // className={paddingLeft ? `ml-${paddingLeft}` : ''}
               // style={{ marginLeft: '10px' }}
      >
        <Popover.Header as="h3">{title}</Popover.Header>
        <Popover.Body>
          {children}
        </Popover.Body>
      </Popover>
    </Overlay>
      : <></>
  )
}

export default MyOverlay
