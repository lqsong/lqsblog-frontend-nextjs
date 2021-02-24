import { combineReducers } from 'redux'

import globalConfigSlice from "./global-config/slice";
import globalNavActiveSlice from "./global-navactive/slice";

import aboutSlice from "./about/slice";
import linksSlice from "./links/slice";


const rootReducer = combineReducers({
  globalConfig: globalConfigSlice.reducer,
  globalNavActive: globalNavActiveSlice.reducer,
  about: aboutSlice.reducer,
  links: linksSlice.reducer,
});

export default rootReducer
