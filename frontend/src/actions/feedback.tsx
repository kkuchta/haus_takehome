import { Action } from 'redux'
import { AppState } from '../store'
import { ThunkAction } from 'redux-thunk'

function requestSaveFeedback() {
  return { type: 'REQUEST_SAVE_FEEDBACK' }
}

function requestFeedback() {
  return { type: 'REQUEST_FEEDBACK' }
}

function receiveFeedback(feedback: { content: string }) {
  return {
    type: 'RECEIVE_FEEDBACK',
    feedback: feedback.content
  }
}
export type ReceiveFeedbackAction = ReturnType<typeof receiveFeedback>

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

