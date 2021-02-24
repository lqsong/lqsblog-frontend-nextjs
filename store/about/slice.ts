import { createSlice, Draft, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { AboutState, AboutResponse } from './types';

interface AboutReducer extends SliceCaseReducers<AboutState> {
    load(state: Draft<AboutState>, action: PayloadAction<string>),
  
    success(state: Draft<AboutState>, action: PayloadAction<AboutResponse>),
  
    failure(state: Draft<AboutState>)
}

const initialState: AboutState = { 
  loading: false, 
  about: {
      title: '',
      content: '',
      keywords: '',
      description: ''
  } 
};

const aboutSlice = createSlice<AboutState, AboutReducer>({
  name: 'about',
  initialState,
  reducers: {
    load: (state, { payload: keyword }: PayloadAction<string>) => {
      state.loading = true;
    },
    success: (state, { payload: aboutResponse }: PayloadAction<AboutResponse>) => {
      state.loading = false;
      state.about = aboutResponse;
    },
    failure: (state) => {
      state.loading = false;
      state.about = initialState.about;
    },
  },
});

export default aboutSlice;