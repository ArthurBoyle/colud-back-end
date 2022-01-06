import { request } from 'umi';

export const getPageData = (sid: string) => {
  return request('api/admin/zhuanpan/get_zhuanpan_log', {
    method: 'post',
    data: { sid }
  });
};

export const deleteById = (id: number) => {
  return request('api/admin/Zhuanpan/dellog', {
    method: 'post',
    data: { id }
  });
};
