import { request } from 'umi';

export const getPageData = (sid: string) => {
  return request('api/admin/System/get_gzh', {
    method: 'post',
    data: { sid }
  });
};

export const save = (params: any) => {
  return request('api/admin/System/gzh', {
    method: 'post',
    data: params
  });
};
