import React from 'react'
import { Navbar } from 'react-bootstrap'
import Search from './Search/Search'
import Profile from 'components/Header/Profile/Profile'
import style from './Header.module.scss'
import Basket from './Basket/Basket'

const Header = () => {
  return (
    <header className={'header fixed-top d-flex align-items-center'}>
      <Navbar fixed={'top'} bg="light" variant="light"
              className={'flex align-items-center justify-content-between pl-8'}>
          <Navbar.Brand className={style.hide_logo}>
            <i className="bi bi-shop text-4xl"></i>
          </Navbar.Brand>

          <Search />
          <div className={'flex'}>
            <Basket />
            <Profile />
          </div>
      </Navbar>
    </header>
  )
}

export default Header
