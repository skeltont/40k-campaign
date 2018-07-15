import React from 'react'
import ReactDOM from 'react-dom'
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render((
  <CookiesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CookiesProvider>
), document.getElementById('root'))
registerServiceWorker()
