import { Button, Card } from 'react-bootstrap'
import React from 'react'

interface CardProps {
  children: React.ReactNode
  title: string
  className?: string
  onSend?: () => void
  onSendName?: string
}

export function CardComponent (
  {
    children, title,
    onSend, onSendName, className
  }: CardProps) {
  return (
      <Card className={`text-center ${className}`}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <div className={'card-text'}>
            {children}
          </div>
          {onSend &&
          <Button variant="primary" onClick={onSend}>
            {onSendName !== undefined ? onSendName : 'Отправить'}
          </Button>
          }
        </Card.Body>
      </Card>
  )
}
