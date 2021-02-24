import { all, call, put, takeLatest } from 'redux-saga/effects';

import linksSlice from "./slice";
import { getLinksListApi, getLinksRecommendApi } from "./server";
import { LinksListResponse, LinksRecommendResponse } from "./types";

const { loadList, successList, failureList, loadRecommend, successRecommend, failureRecommend } = linksSlice.actions;

function* loadLinksList({ payload }: ReturnType<typeof loadList>) {
  try {
    const result: LinksListResponse = yield call(getLinksListApi); 
    yield put(successList(result));
  } catch (e) {
    console.error('...error...', e);
    yield put(failureList());
  }
}

function* loadLinksRecommend({ payload }: ReturnType<typeof loadRecommend>) {
  try {
    const result: LinksRecommendResponse = yield call(getLinksRecommendApi); 
    yield put(successRecommend(result));
  } catch (e) {
    console.error('...error...', e);
    yield put(failureRecommend());
  }
}

export default function* linksSaga() {
  yield all([
    takeLatest(loadList, loadLinksList),
    takeLatest(loadRecommend, loadLinksRecommend),
  ]);
}