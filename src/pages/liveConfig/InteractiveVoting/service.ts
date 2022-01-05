import { request } from 'umi';

export const getPageData = (sid: string) => {
  return request('api/admin/System/getvote', {
    method: 'post',
    data: { sid }
  });
};

export const save = (params: any) => {
  return request('api/admin/System/setvote', {
    method: 'post',
    data: params
  });
};
