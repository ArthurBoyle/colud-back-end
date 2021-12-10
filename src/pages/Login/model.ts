import { Effect } from 'umi';
import { login } from './service';

interface Model {
  namespace: string;
  effects: Record<string, Effect>;
}

const model: Model = {
  namespace: 'login',
  effects: {
    *login({ payload, callback }, { call }) {
      try {
        const result = yield call(login, payload);
        callback(result);
      } catch (error) {
        callback(false);
      }
    }
  }
};

export default model;
