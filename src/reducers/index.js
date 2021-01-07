import { combineReducers } from "redux";

import chat from "./chat";
import alert from "./alert";

export default combineReducers({
  chat,
  alert,
});
