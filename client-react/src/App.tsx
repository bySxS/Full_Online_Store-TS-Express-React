import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from 'store'
import Header from 'components/Header/Header'
import AppRouter from 'AppRouter'
import { Helmet } from 'react-helmet'
import SideBar from 'components/SideBar/SideBar'
import Alarm from 'components/UI/Alarm/Alarm'
import Loader from 'components/UI/Loader/Loader'
import { ALERT_CONNECTION } from 'constants/constant'
// import { Breadcrumbs } from 'components/Breadcrumb/Breadcrumb'
import style from './styles/App.module.scss'
import { ModalState } from 'components/UI/Modal/ModalContext'
import { Breadcrumbs } from 'components/Breadcrumb/Breadcrumb'

function App () {
  return (
    <Provider store={ store }>
      <Helmet titleTemplate={'%s - My First Store'}>
        <meta charSet="utf-8" />
      </Helmet>
    <BrowserRouter>
      <div className="App">
        <ModalState>  {/* контекст модального окна */}
          <Header />
          <SideBar />
          <div className={'body'}>
            <div className={style.body_content}>
              <Breadcrumbs />
              <AppRouter />
            </div>
          </div>
          {ALERT_CONNECTION && <Alarm/>}
          <Loader/>
        </ModalState>
      </div>
    </BrowserRouter>
    </Provider>
  )
}

export default App
