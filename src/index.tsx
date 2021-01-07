import 'normalize.css'; 
import "bootstrap/dist/css/bootstrap.css";
import "./static/sass/main.scss";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import "./static/audio/notification_gertz.mp3";
import "./utils/detect_browser";
import "./utils/origin_polyfill";
import rootReducer from "./reducers";
import rootEpic from "./epics";
import App from "./components/App";

const composeEnhancers = (window && window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]) || compose;

const epicMiddleware = createEpicMiddleware(rootEpic);
const enhancer = composeEnhancers(applyMiddleware(epicMiddleware));

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
