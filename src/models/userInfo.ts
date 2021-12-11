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
    getUserInfo(state: State) {
      if (window.localStorage.getItem('user') === null) {
        window.localStorage.clear();
        history.replace('/login');
      } else {
        state.uid = <string>window.localStorage.getItem('user');
        history.replace('/liveList');
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
