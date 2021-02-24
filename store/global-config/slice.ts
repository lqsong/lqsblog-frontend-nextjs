import { createSlice, Draft, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { GlobalConfigState, GlobalConfigResponse } from './types';

interface GlobalConfigReducer extends SliceCaseReducers<GlobalConfigState> {
    load(state: Draft<GlobalConfigState>, action: PayloadAction<string>),
  
    success(state: Draft<GlobalConfigState>, action: PayloadAction<GlobalConfigResponse>),
  
    failure(state: Draft<GlobalConfigState>)
}

const initialState: GlobalConfigState = { 
  loading: false, 
  config: {
      siteCreationTime: '',
      copyrightPerson: '',
      copyrightUrl: '',
      icp: '',
      keywords: '',
      description: ''
  } 
};

const globalConfigSlice = createSlice<GlobalConfigState, GlobalConfigReducer>({
  name: 'globalConfig',
  initialState,
  reducers: {
    load: (state, { payload: keyword }: PayloadAction<string>) => {
      state.loading = true;
    },
    success: (state, { payload: globalConfigResponse }: PayloadAction<GlobalConfigResponse>) => {
      state.loading = false;
      state.config = globalConfigResponse;
    },
    failure: (state) => {
      state.loading = false;
      state.config = initialState.config;
    },
  },
});

export default globalConfigSlice;