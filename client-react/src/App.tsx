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

function App () {
  return (
    <Provider store={ store }>
      <Helmet titleTemplate={'%s - My First Store'}>
        <meta charSet="utf-8" />
      </Helmet>
    <BrowserRouter>
      <div className="App">
        <Header/>
        <div className={'flex body'}>
          <SideBar />
          <AppRouter />
        </div>
        <Alarm/>
        <Loader/>
      </div>
    </BrowserRouter>
    </Provider>
  )
}

export default App
