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
        } else {
          // TODO handle other errors
        }
      })
  }
}

function postSession(username: string, password: string) {
  return fetch('/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
}

function receiveBadLogin() {
  return {
    type: 'RECEIVE_BAD_LOGIN'
  }
}
function requestLogin() {
  return {
    type: 'REQUEST_LOGIN'
  }
}

export function login(username: string, password: string): ThunkAction<void, AppState, null, Action> {
  return (dispatch) => {
    dispatch(requestLogin())
    postSession(username, password).then(
      response => {
        if (response.status === 403) {
          dispatch(receiveBadLogin());
        } else if (response.ok) {
          dispatch(receiveUser(response.json));
        } else {
          // TODO handle other errors
        }
      }
    )
  }
}

function clearUser() {
  return {
    type: 'CLEAR_USER'
  }
}

function deleteSession() {
  return fetch('/api/session', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function logout(): ThunkAction<void, AppState, null, Action> {
  return (dispatch) => {
    deleteSession().then(() => dispatch(clearUser()))
  }
}
