import { request } from 'umi';

/**
 * 是否禁言
 */
export const get_jinyan = (sid: string) => {
  return request('api/index/Chatu/get_jinyan', {
    method: 'post',
    data: { sid }
  });
};

/**
 * 获取聊天数据
 */
export const send = (sid: string) => {
  return request('api/index/Chatu/send', {
    method: 'post',
    data: { sid }
  });
};

export const is_jinyan = (params: { sid: string; jinyan: number }) => {
  const { sid, jinyan } = params;
  return request('api/index/Chatu/is_jinyan', {
    method: 'post',
    data: { sid, jinyan }
  });
};

export const delChat = (id: number) => {
  return request('api/index/Chatu/delchat', {
    method: 'post',
    data: { id }
  });
};
