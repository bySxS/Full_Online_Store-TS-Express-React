import React from 'react'
import { SSRProvider } from 'react-bootstrap'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/custom.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
// двойной рендер из за StrictMode
root.render(
  // <React.StrictMode>
  <SSRProvider>
    <App />
  </SSRProvider>
  // </React.StrictMode>
)
