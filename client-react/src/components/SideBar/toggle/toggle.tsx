import React from 'react'
import { NavLink, useAccordionButton } from 'react-bootstrap'

interface IToggleProps {
  children: React.ReactNode
  eventKey: string
}

function Toggle ({ children, eventKey }: IToggleProps) {
  const decoratedOnClick = useAccordionButton(eventKey, () => {})
  // console.log('totally custom!')

  return (
     <NavLink
        className="sideBarLink"
        onClick={decoratedOnClick}
     >
       {children}
     </NavLink>
  )
}

export default Toggle
