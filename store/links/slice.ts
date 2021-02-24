import { createSlice, Draft, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { LinksState, LinksListResponse, LinksRecommendResponse } from './types';

interface LinksReducer extends SliceCaseReducers<LinksState> {
    loadList(state: Draft<LinksState>, action: PayloadAction<string>);
  
    successList(state: Draft<LinksState>, action: PayloadAction<LinksListResponse>);
  
    failureList(state: Draft<LinksState>);

    loadRecommend(state: Draft<LinksState>, action: PayloadAction<string>);

    successRecommend(state: Draft<LinksState>, action: PayloadAction<LinksRecommendResponse>);
  
    failureRecommend(state: Draft<LinksState>);
}

const initialState: LinksState = { 
  listLoading: false, 
  listData:[],
  recommendLoading: false,
  recommendData: []
};

const linksSlice = createSlice<LinksState, LinksReducer>({
  name: 'links',
  initialState,
  reducers: {
    loadList: (state, { payload: keyword }: PayloadAction<string>) => {
      state.listLoading = true;
    },
    successList: (state, { payload: listResponse }: PayloadAction<LinksListResponse>) => {
      state.listLoading = false;
      state.listData = listResponse;
    },
    failureList: (state) => {
      state.listLoading = false;
      state.listData = initialState.listData;
    },
    loadRecommend: (state, { payload: keyword }: PayloadAction<string>) => {
      state.recommendLoading = true;
    },
    successRecommend: (state, { payload: response }: PayloadAction<LinksRecommendResponse>) => {
      state.recommendLoading = false;
      state.recommendData = response;
    },
    failureRecommend: (state) => {
      state.recommendLoading = false;
      state.recommendData = initialState.recommendData;
    },
  },
});

export default linksSlice;