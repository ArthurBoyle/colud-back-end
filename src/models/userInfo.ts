import { history, Effect, Reducer } from 'umi';
import { login } from '@/services/userInfo';

export interface State {
  uid: string;
  sid: string;
}

interface Model {
  nameSpace: string;
  state: State;
  effects: Record<string, Effect>;
  reducers: Record<string, Reducer>;
}

const model: Model = {
  nameSpace: 'userInfo',
  state: { uid: '', sid: '' },
  effects: {
    *login({ payload, callback }, { call }) {
      try {
        const result = yield call(login, payload);
        callback(result);
      } catch (error) {
        callback(false);
      }
    }
  },
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
