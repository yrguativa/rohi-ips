import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom'

import { store } from './store'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <HashRouter basename="/">
        <App />
      </HashRouter>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)