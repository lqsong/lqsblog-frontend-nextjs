import { all, call } from 'redux-saga/effects';

import globalConfigSaga from "./global-config/saga";
import aboutSaga from "./about/saga";
import linksSaga from "./links/saga";

export default function* rootSaga() {
  yield all([
    call(globalConfigSaga),
    call(aboutSaga),
    call(linksSaga),
  ])
}


