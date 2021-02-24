import { all, call, put, takeLatest } from 'redux-saga/effects';

import globalConfigSlice from "./slice";
import { getConfigApi } from "./server";
import { GlobalConfigResponse } from "./types";

const { load, success, failure } = globalConfigSlice.actions;

function* loadConfig({ payload }: ReturnType<typeof load>) {
  try {
    const result: GlobalConfigResponse = yield call(getConfigApi/* , payload */);   
    yield put(success(result));
  } catch (e) {
    console.error('...error...', e);
    yield put(failure());
  }
}

export default function* globalConfigSaga() {
  yield all([
    takeLatest(load, loadConfig),
  ]);
}