import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from 'store'
import Header from 'components/Header/Header'
import { Helmet } from 'react-helmet'
import SideBar from 'components/SideBar/SideBar'
import Alarm from 'components/UI/Alarm/Alarm'
import Loader from 'components/UI/Loader/Loader'
import { ALERT_CONNECTION } from 'constants/constant'
import Body from 'components/Body/Body'
import { ModalState } from 'context/ModalContext'
import Footer from 'components/Footer/Footer'
import { CategoryState } from './context/CategoryProductContext'

function App () {
  return (
    <Provider store={ store }>
      <Helmet titleTemplate={'%s - My First Store'}>
        <meta charSet="utf-8" />
      </Helmet>
    <BrowserRouter>
      <div className="App">
        <ModalState>  {/* контекст модального окна */}
        <CategoryState> {/* контекст категории текущего продукта */}
          <Header />
          <SideBar />
          <Body />
          <Footer />
          {ALERT_CONNECTION && <Alarm/>}
          <Loader/>
        </CategoryState>
        </ModalState>
      </div>
    </BrowserRouter>
    </Provider>
  )
}

export default App
