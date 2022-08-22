import React, { FC } from 'react'
import { Offcanvas } from 'react-bootstrap'

interface IOffCanvas {
  children: React.ReactNode
  title?: string
  onClose: () => void
  show: boolean
  backdrop?: boolean
  backdropClassName?: string
  center?: boolean
  onSend?: () => void
  onSendName?: string
  className?: string
}

const OffCanvas: FC<IOffCanvas> = ({
  children, title, show,
  className,
  onClose,
  backdrop = true,
  backdropClassName
}) => {
  return (
    <>
      <Offcanvas
        show={show}
        onHide={onClose}
        className={className || ''}
        placement={'end'}
        scroll={true}
        autoFocus={true}
        backdrop={backdrop}
        backdropClassName={backdropClassName}
      >
        {title &&
          <Offcanvas.Header
          closeButton={true}
          closeVariant={'white'}
        >
            <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        }
        <Offcanvas.Body>
          {children}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default OffCanvas
