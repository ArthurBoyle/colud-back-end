/*
import { Subscription, Effect, Reducer } from 'umi';
// import { ConnectState } from './connect.d';

export interface GlobalModelType<U> {
  namespace: 'global';
  state: Record<string, any>;
  effects: {
    fetchNotices: Effect;
    clearNotices: Effect;
    changeNoticeReadState: Effect;
    fetchJumpList: Effect;
  };
  reducers: Record<string, Reducer>;
  subscriptions: { setup: Subscription };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {},

  effects: {},

  reducers: {},

  subscriptions: {
    setup({ history }): void {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }): void => {
        console.log({ pathname });
        // if (typeof window.ga !== 'undefined') {
        //   // window.ga('send', 'pageview', pathname + search);
        // }
      });
    }
  }
};

export default GlobalModel;
*/

const modal = {
  namespace: 'test',
  state: {},
  effects: {},
  reducers: {}
};

export default modal;
