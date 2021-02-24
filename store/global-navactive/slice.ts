// activeNav

import { createSlice, Draft, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';

import { GlobalNavActiveState } from "./types";

interface GlobalNavActiveReducer extends SliceCaseReducers<GlobalNavActiveState> {
    success(state: Draft<GlobalNavActiveState>, action: PayloadAction<String>),
}

const globalNavActiveSlice = createSlice<GlobalNavActiveState, GlobalNavActiveReducer>({
    name: 'globalNavActive',
    initialState: {
      value: ''
    },
    reducers: {
      success: (state, { payload: string }: PayloadAction<String>) => {
        state.value = string;
      },  
    }
})

export default globalNavActiveSlice;