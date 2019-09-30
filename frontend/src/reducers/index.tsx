import { combineReducers } from 'redux'
import user from './user'
import feedback from './feedback'
import session from './session'
export default combineReducers({
  session,
  user,
  feedback
})
