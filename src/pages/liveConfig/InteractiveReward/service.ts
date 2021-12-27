import { request } from 'umi';

export const getPageData = (sid: string) => {
  return request('api/admin/Rewarda/get_reward', {
    method: 'post',
    data: { sid }
  });
};

export const save = (params: any) => {
  return request('api/admin/Rewarda/reward', {
    method: 'post',
    data: params
  });
};
