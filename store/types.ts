import { Store } from 'redux';
import { Task } from 'redux-saga';

import { GlobalConfigState } from './global-config/types';
import { GlobalNavActiveState } from "./global-navactive/types";
import { AboutState } from './about/types';
import { LinksState } from "./links/types";


export interface State {
  globalConfig: GlobalConfigState;
  globalNavActive: GlobalNavActiveState;
  about: AboutState;
  links: LinksState;
}

export interface SagaStore extends Store {
  sagaTask?: Task;
}
