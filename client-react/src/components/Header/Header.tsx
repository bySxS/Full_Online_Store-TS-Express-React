import React from 'react'
import { Navbar } from 'react-bootstrap'
import Search from './Search/Search'
import Profile from 'components/Header/Profile/Profile'
import style from './Header.module.scss'

const Header = () => {
  return (
    <header className={'header fixed-top d-flex align-items-center'}>
      <Navbar fixed={'top'} bg="light" variant="light"
              className={'d-flex align-items-center justify-content-between pl-8'}>
          <Navbar.Brand className={style.hide_logo}>
            <i className="bi bi-shop pr-1 text-3xl"></i>
          </Navbar.Brand>

          <Search />

          <Profile />

      </Navbar>
    </header>
  )
}

export default Header
