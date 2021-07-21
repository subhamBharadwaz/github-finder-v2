import { SET_ALERT, REMOVE_ALERT, CLOSE_ALERT } from '../Types'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return action.payload
    case REMOVE_ALERT:
      return null
    case CLOSE_ALERT:
      return null
    default:
      return state
  }
}
