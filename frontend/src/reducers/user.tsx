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
  user?: User
}

type UserAction = (Action | ReceiveUserAction);

export default function(state: UserStateShape | undefined, action: UserAction) {
  switch (action.type) {
    case 'REQUEST_USER':
      return {...state, isFetching: true}
    case 'RECEIVE_USER':
      return {...state, isFetching: false, user: (action as ReceiveUserAction).user}
    case 'RECEIVE_UNAUTHORIZED_USER':
      return {...state, isFetching: false, user: "UNAUTHORIZED_USER"}
  }
  return state === undefined ? { isFetching: false } : state;
}
