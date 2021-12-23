import { request } from 'umi';

/**
 * 获取数据
 * @param sid
 */
export const get_theme = (sid: string) => {
  return request('api/admin/System/get_theme', {
    method: 'post',
    data: { sid }
  });
};

export const theme = (params: { sid: string; bg_color: string; channel_url: string }) => {
  return request('api/admin/System/theme', {
    method: 'post',
    data: params
  });
};
