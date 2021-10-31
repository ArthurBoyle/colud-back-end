import { request } from 'umi';

export const login = (params: { mobile: string; pwd: string }) => {
  return request('api/admin/Login/login', {
    method: 'post',
    data: { ...params }
  });
};
