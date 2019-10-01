import { Action } from 'redux'
import { AppState } from '../store'
import { ThunkAction } from 'redux-thunk'
import { receiveUser, clearUser } from './user'

function receiveLoginFailure() {
  return {
    type: 'RECEIVE_LOGIN_FAILURE'
  }
}
function requestLogin() {
  return {
    type: 'REQUEST_LOGIN'
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

function postSession(username: string, password: string) {
  return fetch('/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
}

export function login(username: string, password: string): ThunkAction<void, AppState, null, Action> {
  return async (dispatch) => {
    dispatch(requestLogin())
    const response = await postSession(username, password)
    if (response.status === 403) {
      console.log('failure')
      dispatch(receiveLoginFailure());
    } else if (response.ok) {
      console.log('failure')
      const json = await response.json();
      dispatch(receiveUser(json));
    } else {
      // TODO handle other errors
      console.log('Error logging in');
    }
  }
}

