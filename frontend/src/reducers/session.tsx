import { Action } from "redux";

interface SessionStateShape {
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  lastLoginSuccess?: boolean;
}
export default function(state: SessionStateShape | undefined, action: Action) {
  if (state == null) {
    state = { isLoggingIn: false, isLoggingOut: false };
  }
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {...state, isLoggingIn: true, lastLoginSuccess: undefined };
    case "RECEIVE_LOGIN":
      return {...state, isLoggingIn: false, lastLoginSuccess: true };
    case "RECEIVE_LOGIN_FAILURE":
      return {...state, isLoggingIn: false, lastLoginSuccess: false };
    case "REQUEST_LOGOUT":
      return {...state, isLoggingOut: true };
    case "RECEIVE_LOGOUT":
      return {...state, isLoggingOut: false };
    case "REQUEST_SIGNUP":
      return {...state, lastLoginSuccess: undefined };
    case "RECEIVE_USER":
      return {...state, lastLoginSuccess: undefined };
    case "CLEAR_USER":
      return {...state, lastLoginSuccess: undefined };
  }
  return state;
}
