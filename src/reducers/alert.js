import { ALERT_DISPLAY } from "../actions/alertActions";

const initialState = {
  alertMessage: "",
  alertStyle: "",
};

function alert(state = initialState, action) {
  switch (action.type) {
  case ALERT_DISPLAY:
    return {
      alertMessage: action.message,
      alertStyle: action.style,
    };

  default:
    return state;
  }
}

export default alert;
