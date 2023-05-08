import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GlobalState from './Contexts/GlobalState'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ThemeProvider } from 'react-bootstrap'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <GlobalState>
    <ThemeProvider
          breakpoints={['xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
          minBreakpoint='xxs'
        >
          <Router>
            <Routes>
              <Route path='/*' exact element={<App />} />
            </Routes>
          </Router>
      </ThemeProvider>
    </GlobalState>
  </React.StrictMode>
)
