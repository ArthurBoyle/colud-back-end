import { request } from 'umi';

export const createActivity = (params: any) => {
  return request('api/admin/System/creator', {
    method: 'post',
    data: params
  });
};
