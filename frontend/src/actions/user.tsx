import { Action } from 'redux'
import { AppState } from '../store'
import { ThunkAction } from 'redux-thunk'

export function receiveUser(json: any) {
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

function requestSignup() {
  return {
    type: 'REQUEST_SIGNUP'
  }
}

function receiveBadSignup() {
  return {
    type: 'RECEIVE_SIGNUP_FAILURE'
  }
}

export function clearUser() {
  return {
    type: 'CLEAR_USER'
  }
}

export function fetchUser(): ThunkAction<void, AppState, null, Action> {
  return async (dispatch) => {
    dispatch(requestUser())
    const response = await fetch(`/api/user`)
    if (response.status === 403) {
      dispatch(receiveUnauthorizedUser());
    } else if (response.ok) {
      const json = await response.json();
      dispatch(receiveUser(json));
    } else {
      // TODO handle other errors
      console.log('Error fetching user');
    }
  }
}

export function signup(username: string, password: string): ThunkAction<void, AppState, null, Action> {
  return async (dispatch) => {
    dispatch(requestSignup())
    const response = await postUser(username, password)
    if (response.status === 400) {
      dispatch(receiveBadSignup());
    } else if (response.ok) {
      const json = await response.json();
      dispatch(receiveUser(json));
    } else {
      console.log('Error signing up');
    }
  }
}
function postUser(username: string, password: string) {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
}
