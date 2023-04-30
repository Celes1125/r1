import React from 'react'
import GlobalState from './Contexts/GlobalState'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import Menu from './Components/Menu'
import Profile from './Pages/Profile'
import SearchTask from './Pages/SearchTask'
import 'bootstrap/dist/css/bootstrap.min.css'
import AddTask from './Components/AddTask'
import EditTask from './Components/EditTask'
import { ThemeProvider } from 'react-bootstrap'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>

    <ThemeProvider
      breakpoints={['xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint='xxs'
    >

      <GlobalState>
        <Router>
          <Menu />

          <Routes>
            <Route path='/' exact element={<App />} />
            <Route path='/add' exact element={<AddTask />} />
            <Route path='/search' exact element={<SearchTask />} />
            <Route path='/profile' exact element={<Profile />} />
            <Route path='/edit' exact element={<EditTask />} />

          </Routes>
        </Router>

      </GlobalState>

    </ThemeProvider>

  </React.StrictMode>
)
