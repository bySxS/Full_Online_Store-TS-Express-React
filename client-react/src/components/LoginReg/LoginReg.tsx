import React, { FC, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import Login from '../Login/Login'
import Registration from '../Registration/Registration'
import { ModalComponent } from '../UI/Modal/ModalComponent'

const LoginReg: FC = () => {
  const [showLoginPage, setShowLoginPage] = useState(false)
  const handleCloseLoginPage = () => setShowLoginPage(false)
  const handleShowLoginPage = () => setShowLoginPage(true)

  const [showRegPage, setShowRegPage] = useState(false)
  const handleCloseRegPage = () => setShowRegPage(false)
  const handleShowRegPage = () => setShowRegPage(true)

  return (
    <>
      <Dropdown.Item
        className="dropdown-item d-flex align-items-center"
        onClick={handleShowLoginPage}>
        <i className="bi bi-box-arrow-in-right pr-1.5"/>
        <span>Вход</span>
      </Dropdown.Item>
      {showLoginPage &&
       <ModalComponent
         show={showLoginPage}
         title={'Вход'}
         onClose={handleCloseLoginPage}
         className={'w-[435px]'}
       >
         <Login onCloseLogin={handleCloseLoginPage} onShowReg={handleShowRegPage}/>
       </ModalComponent>
      }
      {showRegPage &&
       <ModalComponent
         show={showRegPage}
         title={'Регистрация'}
         onClose={handleCloseRegPage}
         className={'w-[435px]'}
       >
         <Registration onCloseReg={handleCloseRegPage} onShowLogin={handleShowLoginPage} />
       </ModalComponent>
      }
    </>
  )
}

export default LoginReg
