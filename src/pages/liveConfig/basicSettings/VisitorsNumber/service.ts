import { request } from 'umi';

export const getPageData = (sid: string) => {
  return request('api/admin/System/get_renshu', {
    method: 'post',
    data: { sid }
  });
};

export const save = (params: any) => {
  return request('api/admin/System/renshu', {
    method: 'post',
    data: params
  });
};
