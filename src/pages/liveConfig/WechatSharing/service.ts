import { request } from 'umi';

export const getTheme = (sid: string) => {
  return request('api/admin/System/get_theme', {
    method: 'post',
    data: { sid }
  });
};

export const getPageData = (sid: string) => {
  return request('api/admin/Shared/get_shezhi', {
    method: 'post',
    data: { sid }
  });
};

export const save = (params: any) => {
  return request('api/admin/Shared/shezhi', {
    method: 'post',
    data: params
  });
};
