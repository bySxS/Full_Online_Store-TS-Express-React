import React, { useState } from 'react'
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
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'

interface ICrumbs {
  title: string,
  path: string
}

function App () {
  const [crumbs] =
    useState<ICrumbs[]>([
      { title: 'Home', path: '/' },
      { title: 'Category', path: '/category' },
      { title: 'Sub Category', path: '/category/sub' }
    ])

  const selected = (crumb: string) => {
    console.log(crumb)
  }

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
          <div className={'p-4'}>
            <Breadcrumb crumbs={crumbs} selected={selected}/>
            <AppRouter />
          </div>
        </div>
        {ALERT_CONNECTION && <Alarm/>}
        <Loader/>
      </div>
    </BrowserRouter>
    </Provider>
  )
}

export default App
