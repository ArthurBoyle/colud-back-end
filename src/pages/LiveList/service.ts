import { request } from 'umi';

export const getPageData = (uid: string) => {
  return request('api/admin/System/find_c', {
    method: 'post',
    data: { uid }
  });
};

export const deleteData = (uid: string, sid: string) => {
  return request('api/admin/System/del_c', {
    method: 'post',
    data: { uid, sid }
  });
};
