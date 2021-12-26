import { request } from 'umi';

export const getPageData = (sid: string) => {
  return request('api/admin/System/get_bodao', {
    method: 'post',
    data: { sid }
  });
};

export const save = (params: any) => {
  return request('api/admin/System/bodao', {
    method: 'post',
    data: params
  });
};
