import { fork, all } from "redux-saga/effects";

import arcWatcherSaga from "./redux/saga";
function* rootSaga() {
  yield all([
    fork(arcWatcherSaga)
  ]);
}

export default rootSaga;