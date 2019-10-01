import { combineReducers } from "redux";
import feedback from "./feedback";
import session from "./session";
import user from "./user";
export default combineReducers({
  session,
  user,
  feedback,
});
