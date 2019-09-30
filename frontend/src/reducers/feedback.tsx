import { Action } from 'redux'
import { ReceiveFeedbackAction } from '../actions'

interface FeedbackStateShape {
  isFetching: boolean,
  feedback?: string
}
type FeedbackAction = (Action | ReceiveFeedbackAction)
export default function(state: FeedbackStateShape | undefined, action: Action) {
  switch (action.type) {
    case 'REQUEST_FEEDBACK':
      return {...state, isFetching: true }
    case 'RECEIVE_FEEDBACK':
      return {...state, isFetching: false, feedback: (action as ReceiveFeedbackAction).feedback}
  }
  return state === undefined ? { isFetching: false } : state;
}
