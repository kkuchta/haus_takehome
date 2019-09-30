import { Action } from 'redux'
import { ReceiveUserAction } from '../actions'

export const UnauthorizedUser = "UNAUTHORIZED_USER"
type UnauthorizedUserType = "UNAUTHORIZED_USER"

export type User = (UnauthorizedUserType | {
  id: number
  username: string
})

interface UserStateShape {
  isFetching: boolean
  isSigningUp: boolean
  lastSignupSuccess?: boolean
  user?: User
}

type UserAction = (Action | ReceiveUserAction);

export default function(state: UserStateShape | undefined, action: UserAction) {
  if (state == null) {
    state = { isFetching: false, isSigningUp: false }
  }
  switch (action.type) {
    case 'REQUEST_USER':
      return {...state, isFetching: true}
    case 'RECEIVE_USER':
      return {
        ...state, isFetching: false, isSigningUp: false, user: (action as ReceiveUserAction).user}
    case 'RECEIVE_UNAUTHORIZED_USER':
      return {...state, isFetching: false, user: "UNAUTHORIZED_USER"}
    case 'CLEAR_USER':
      return {...state, isFetching: false, user: "UNAUTHORIZED_USER", lastSignupSuccess: undefined }
    case 'REQUEST_SIGNUP':
      return {...state, isSigningUp: true, lastSignupSuccess: undefined }
    case 'REQUEST_LOGIN':
      return {...state, lastSignupSuccess: undefined }
    case 'RECEIVE_SIGNUP_FAILURE':
      return {...state, isSigningUp: false, lastSignupSuccess: false}
  }
  return state;
}
