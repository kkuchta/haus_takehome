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

function postSession(username: string, password: string) {
  return fetch('/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
}

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
//function receiveLogin() {
  //return {
    //type: 'RECEIVE_LOGIN'
  //}
//}

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

function patchFeedback(feedback: string) {
  console.log('patchFeedback')
  return fetch('/api/feedback', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content: feedback })
  });
}

function requestSaveFeedback() {
  return {
    type: 'REQUEST_SAVE_FEEDBACK'
  }
}

function receiveFeedback(feedback: { content: string }) {
  return {
    type: 'RECEIVE_FEEDBACK',
    feedback: feedback.content
  }
}
export type ReceiveFeedbackAction = ReturnType<typeof receiveFeedback>

function requestFeedback() {
  return {
    type: 'REQUEST_FEEDBACK'
  }
}

export function saveFeedback(feedback: string): ThunkAction<void, AppState, null, Action> {
  return async (dispatch) => {
    dispatch(requestSaveFeedback());
    const response = await patchFeedback(feedback)
    if (response.ok) {
      const json = await response.json();
      dispatch(receiveFeedback(json));
    } else {
      // TODO handle error
      console.log('Error saving feedback');
    }
  };
};

export function fetchFeedback(): ThunkAction<void, AppState, null, Action> {
  // TODO
  return async (dispatch) => {
    dispatch(requestFeedback())
    const response = await fetch(`/api/feedback`)
    if (response.ok) {
      const json = await response.json();
      dispatch(receiveFeedback(json));
    } else {
      // TODO handle other errors
      console.log('Error fetching feedback');
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
