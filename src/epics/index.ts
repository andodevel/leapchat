import { combineEpics } from "redux-observable";
import { catchError } from "rxjs/operators";
import chatEpics from "./chatEpics";

export const rootEpic = (action$, store$, dependencies) =>
  // eslint-disable-next-line
  combineEpics<any>(chatEpics)(action$, store$, dependencies).pipe(
    catchError((error, caught) => {
      console.error(error);
      return caught;
    })
  );

export default rootEpic;
