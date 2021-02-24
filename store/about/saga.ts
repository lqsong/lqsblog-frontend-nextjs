import { all, call, put, takeLatest } from 'redux-saga/effects';

import aboutSlice from "./slice";
import { getAboutApi } from "./server";
import { AboutResponse } from "./types";

const { load, success, failure } = aboutSlice.actions;

function* loadAbout({ payload }: ReturnType<typeof load>) {
  try {
    const result: AboutResponse = yield call(getAboutApi); 
    yield put(success(result));
  } catch (e) {
    console.error('...error...', e);
    yield put(failure());
  }
}

export default function* aboutSaga() {
  yield all([
    takeLatest(load, loadAbout),
  ]);
}