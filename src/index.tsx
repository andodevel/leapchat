import "normalize.css";
import "bootstrap/dist/css/bootstrap.css";
import "./static/sass/main.scss";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { BehaviorSubject } from "rxjs";
import { switchMap } from "rxjs/operators";
import "./static/audio/notification_gertz.mp3";
import "./utils/detect_browser";
import "./utils/origin_polyfill";
import rootReducer from "./reducers";
import rootEpic from "./epics";
import App from "./components/App";

const composeEnhancers =
  (window && window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]) || compose;
const epicMiddleware = createEpicMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
);
const epic$ = new BehaviorSubject(rootEpic);

/* NOTE: Hot reload in DEV mode - potentially create strange bugs. */
{
  const hotReloadingEpic = (...args) =>
    // eslint-disable-next-line
    epic$.pipe(switchMap((epic: any) => epic(...args)));

  // eslint-disable-next-line
  epicMiddleware.run(hotReloadingEpic as any);
  if (module.hot) {
    module.hot.accept("./epics", () => {
      const nextRootEpic = import("./epics");
      // eslint-disable-next-line
      epic$.next(nextRootEpic as any);
    });
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
