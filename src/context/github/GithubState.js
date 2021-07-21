import React, { useReducer } from 'react'
import axios from 'axios'

// Import context
import GithubContext from './githubContext'

// Import reducer
import GithubReducer from './githubReducer'

// Import types
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../Types'

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState)

  // Search users
  const searchUser = async (text) => {
    setLoading()

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
    )

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    })
  }
  // Get users

  // Get repos

  // Clear users

  // Set loading
  const setLoading = () => dispatch({ type: SET_LOADING })

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUser,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  )
}

export default GithubState
