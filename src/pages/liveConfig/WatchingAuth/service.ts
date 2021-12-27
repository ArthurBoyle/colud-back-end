import { request } from 'umi';

export const getPageData = (sid: string) => {
  return request('api/admin/System/getcode', {
    method: 'post',
    data: { sid }
  });
};

export const save = (params: any) => {
  return request('api/admin/System/updatecode', {
    method: 'post',
    data: params
  });
};
