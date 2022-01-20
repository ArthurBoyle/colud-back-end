import { RequestConfig, history } from 'umi';
import { message, notification } from 'antd';

export const dva = {
  config: {
    async onError(e: Error) {
      message.error(e.message);
    }
  }
};

export const request: RequestConfig = {
  errorHandler: (error) => {
    if (error.response) {
      // 请求已发送但服务端返回状态码非 2xx 的响应
      const errorMsg = `请求错误, 错误码: ${error.response.status}`;
      const errorText = error.data?.errorMsg || '';
      notification.error({
        message: errorMsg,
        description: errorText
      });
    } else {
      // 请求初始化时出错或者没有响应返回的异常
      console.log(error.message);
    }
    throw error;
  },
  requestInterceptors: [
    (url: string, options: any) => {
      if (window.localStorage.getItem('user') === null) {
        window.localStorage.clear();
        history.replace('/login');
      }
      return {
        options: { ...options }
      };
    }
  ]
};
