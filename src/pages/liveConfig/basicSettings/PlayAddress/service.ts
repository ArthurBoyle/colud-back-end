import { request } from 'umi';

export const getLiveTel = (sid: string) => {
  return request('api/admin/System/livetel', {
    method: 'post',
    data: { sid }
  });
};

export const updateLiveTel = (sid: string, params: any) => {
  return request('api/admin/System/update_livetel', {
    method: 'post',
    data: { sid, ...params }
  });
};
