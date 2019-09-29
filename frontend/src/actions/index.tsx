import { Action } from 'redux'
import { AppState } from '../store'
import { ThunkAction } from 'redux-thunk'

function receiveUser(json: any) {
  return {
    type: 'RECEIVE_USER',
    user: json
  }
}

export type ReceiveUserAction = ReturnType<typeof receiveUser>
function requestUser() {
  return {
    type: 'REQUEST_USER'
  }
}

function receiveUnauthorizedUser() {
  return {
    type: 'RECEIVE_UNAUTHORIZED_USER'
  }
}

export function fetchUser(): ThunkAction<void, AppState, null, Action> {
  return (dispatch) => {
    dispatch(requestUser())
    return fetch(`/api/user`)
      .then(response => {
        if (response.status === 403) {
          dispatch(receiveUnauthorizedUser());
        } else if (response.ok) {
          dispatch(receiveUser(response.json));
        }
      })
  }
}
