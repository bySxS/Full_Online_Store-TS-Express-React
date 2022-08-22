import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'

interface IModalProps {
  children: React.ReactNode
  title?: string
  onClose: () => void
  show: boolean
  center?: boolean
  onSend?: () => void
  onSendName?: string
  className?: string
}

export function ModalComponent (
  {
    children, title, show, className,
    onClose, onSend, onSendName,
    center = false
  }: IModalProps) {
  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        keyboard={true}
        restoreFocus={true}
        centered={center}
        size={'lg'}
        dialogClassName={className || 'w-[500px]'}
      >
        {title &&
        <Modal.Header
          closeButton={true}
          closeVariant={'white'}
        >
        <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        }
        <Modal.Body>
          { children }
        </Modal.Body>
        {!!onSend &&
        <Modal.Footer>
          {onSend &&
            <Button variant="primary" onClick={onSend}>
              {onSendName || 'Отправить'}
            </Button>
          }
        </Modal.Footer>
        }
      </Modal>
    </>
  )
}
