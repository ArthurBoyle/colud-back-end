import { request } from 'umi';

export const getPageData = (sid: string) => {
  return request('api/admin/System/getconfig', {
    method: 'post',
    data: { sid }
  });
};

export const save = (params: any) => {
  return request('api/admin/System/updateconfig', {
    method: 'post',
    data: params
  });
};
