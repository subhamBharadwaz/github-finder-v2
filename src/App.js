import React, { useState, Fragment } from 'react'

// Import 3rd-party packages
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Import Components
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import User from './components/users/User'
import Alert from './components/layout/Alert'
import About from './components/Pages/About'

// Import states
import GithubState from './context/github/GithubState'

// Import styles
import './App.css'

const App = () => {
  const [alert, setAlert] = useState(null)

  // Set Alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type })
    setTimeout(() => setAlert(null), 5000)
  }

  // Close Alert
  const onClose = () => {
    setAlert(null)
  }

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />

          <div className="container">
            <Alert alert={alert} onClose={onClose} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search setAlert={showAlert} />
                    <Users />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" component={User} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  )
}

export default App
