import { history, Effect, Reducer } from 'umi';
import { login } from '@/services/userInfo';

export interface State {
  uid: string;
}

interface Model {
  nameSpace: string;
  state: State;
  effects: Record<string, Effect>;
  reducers: Record<string, Reducer>;
}

const model: Model = {
  nameSpace: 'userInfo',
  state: { uid: '' },
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
        history.replace('/liveList');
      } else {
        callback && callback();
      }
    }
  }
};

export default model;
