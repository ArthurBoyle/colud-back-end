import { Effect, Reducer } from 'umi';
import { get_jinyan, send, is_jinyan, delChat } from './service';

export interface State {
  pageData: any[];
}

interface Model {
  namespace: string;
  state: State;
  effects: Record<string, Effect>;
  reducers: Record<string, Reducer>;
}

const model: Model = {
  namespace: 'chat',
  state: {
    pageData: []
  },
  effects: {
    *getForbiddenWord({ payload, callback }, { call }) {
      const data = yield call(get_jinyan, payload);
      callback(data);
    },
    *getPageData({ payload }, { call, put }) {
      const data = yield call(send, payload);
      yield put({
        type: 'setPageData',
        payload: data
      });
    },
    *changeForbiddenWord({ payload, callback }, { call }) {
      yield call(is_jinyan, payload);
      callback();
    },
    *delChat({ payload, callback }, { call }) {
      yield call(delChat, payload);
      callback();
    }
  },
  reducers: {
    setPageData(state: State, { payload }) {
      state.pageData = payload;
    }
  }
};

export default model;
