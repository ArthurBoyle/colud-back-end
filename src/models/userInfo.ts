import { history, Reducer } from 'umi';

export interface State {
  uid: string;
  sid: string;
}

interface Model {
  namespace: string;
  state: State;
  reducers: Record<string, Reducer>;
}

const model: Model = {
  namespace: 'userInfo',
  state: { uid: '', sid: '' },
  reducers: {
    getUserInfo(state: State, { callback }) {
      if (window.localStorage.getItem('user') !== null) {
        state.uid = <string>window.localStorage.getItem('user');
      } else {
        callback && callback();
      }
    },
    getSid(state: State) {
      if (window.localStorage.getItem('sid') !== null) {
        state.sid = <string>window.localStorage.getItem('sid');
      }
    },
    clearUserInfo(state: State) {
      window.localStorage.clear();
      state.uid = '';
      history.replace('/login');
    }
  }
};

export default model;
