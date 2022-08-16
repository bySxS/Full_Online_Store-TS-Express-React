import React from 'react'
import { useAccordionButton } from 'react-bootstrap'

interface IToggleProps {
  children: React.ReactNode
  eventKey: string
  onMouseEnter?: () => void
  className?: string
}

function Toggle ({ children, eventKey, className, onMouseEnter }: IToggleProps) {
  const decoratedOnClick = useAccordionButton(eventKey, () => {})

  return (
     <a href="#"
       className={className || ''}
       onClick={decoratedOnClick}
       onMouseEnter={onMouseEnter}
     >
       {children}
     </a>
  )
}

export default Toggle
