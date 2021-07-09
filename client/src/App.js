// import { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Register from './pages/Register'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Appbar from './components/Appbar'

const App = () => {
  return (
    <Router>
      <div>
        <Appbar />
          <Switch>
            <Route exact path='/'>
              <Dashboard />
            </Route>
            <Route path='/profile'>
              <Profile />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
          </Switch>
      </div>
    </Router>
  )
}

export default App
