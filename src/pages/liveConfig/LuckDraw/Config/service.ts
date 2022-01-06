import { request } from 'umi';

export const getPageData = (sid: string) => {
  return request('api/admin/zhuanpan/get_zhuanpan', {
    method: 'post',
    data: { sid }
  });
};

export const save = (params: any) => {
  return request('api/admin/zhuanpan/up_zhuanpan', {
    method: 'post',
    data: params
  });
};
