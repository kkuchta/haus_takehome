import { Action } from "redux";
import { ReceiveFeedbackAction } from "../actions/feedback";

interface FeedbackStateShape {
  isFetching: boolean;
  isSaving: boolean;
  feedback?: string;
}
type FeedbackAction = (Action | ReceiveFeedbackAction);
export default function(state: FeedbackStateShape | undefined, action: Action) {
  if (state == null) {
    state = { isFetching: false, isSaving: false };
  }
  switch (action.type) {
    case "REQUEST_FEEDBACK":
      return {...state, isFetching: true };
    case "REQUEST_SAVE_FEEDBACK":
      return {...state, isSaving: true };
    case "RECEIVE_FEEDBACK":
      return {
        ...state,
        isFetching: false,
        isSaving: false,
        feedback: (action as ReceiveFeedbackAction).feedback,
      };
  }
  return state;
}
