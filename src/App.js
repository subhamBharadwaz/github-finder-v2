import React, { Component, Fragment } from 'react'
import './App.css'

// Import 3rd-party packages
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Import Components
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import User from './components/users/User'
import Alert from './components/layout/Alert'
import About from './components/Pages/About'

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  }

  // Search Github users
  searchUser = async (text) => {
    this.setState({ loading: true })

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
    )

    this.setState({ users: res.data.items, loading: false })
  }

  // Get single Github user
  getUser = async (username) => {
    this.setState({ loading: true })

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
    )

    this.setState({ user: res.data, loading: false })
  }

  // Get users repos
  getUserRepos = async (username) => {
    this.setState({ loading: true })

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
    )

    this.setState({ repos: res.data, loading: false })
  }

  // Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false })

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } })

    setTimeout(() => this.setState({ alert: null }), 5000)
  }

  // Close Alert
  onClose = () => {
    this.setState({ alert: null })
  }

  render() {
    const { users, loading, alert, user, repos } = this.state
    return (
      <Router>
        <div className="App">
          <Navbar />

          <div className="container">
            <Alert alert={alert} onClose={this.onClose} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUser={this.searchUser}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users users={users} loading={loading} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
