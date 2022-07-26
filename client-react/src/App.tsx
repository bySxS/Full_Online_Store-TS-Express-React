import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { setupStore } from 'store'
import Header from 'components/Header/Header'
import AppRouter from 'AppRouter'
import { Helmet } from 'react-helmet'
import SideBar from 'components/SideBar/SideBar'

const store = setupStore()

function App () {
  return (
    <Provider store={ store }>
      <Helmet titleTemplate={'%s - My First Store'}>
        <meta charSet="utf-8" />
      </Helmet>
    <BrowserRouter>
      <div className="App">
        <Header/>
        <SideBar />
        <AppRouter />
      </div>
    </BrowserRouter>
    </Provider>
  )
}

export default App
