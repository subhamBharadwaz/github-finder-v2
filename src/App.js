import React, { Fragment } from 'react'

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
import AlertState from './context/alert/AlertState'

// Import styles
import './App.css'

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />

            <div className="container">
              <Alert />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <Fragment>
                      <Search />
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
      </AlertState>
    </GithubState>
  )
}

export default App
