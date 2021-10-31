import { RequestConfig, history } from 'umi';
import { message, notification } from 'antd';

export const dva = {
  config: {
    async onError(e: Error) {
      await message.error(e.message);
    }
  }
};

export const request: RequestConfig = {
  // credentials: 'include',
  errorHandler: (error) => {
    /*if (error.name === 'BizError') {
      const errorMsg = `请求错误 ${error.data.errorCode || ''}`;
      notification.error({
        message: errorMsg,
        description: error.data.errorMsg
      });
      throw error;
    } else if (error.name === 'AbortError') {
      // 终止请求
      // 如果是终止请求，默认返回成功
      return {
        errorCode: 0 // 请求成功
      };
    }*/
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
    /*if (status === 401) {
      setTimeout(() => {
        // session.logout();
        window.location.href = process.env.loginUrl as string;
      }, 500);
    }*/
    throw error;
  },
  requestInterceptors: [
    (url: string, options: any) => {
      if (window.localStorage.getItem('user') === null) {
        window.localStorage.removeItem('user');
        history.replace('/login');
      }
      return {
        options: { ...options }
      };
    }
  ]
  //  自定义端口规范
  // errorConfig: {
  //   adaptor: (res) => {
  //     return {
  //       success: res.errorCode === 0,
  //       data: res.data,
  //       errorCode: res.errorCode,
  //       errorMessage: res.errorMsg
  //     };
  //   }
  // },
  // middlewares: [],
  // requestInterceptors: [
  //   (url: string, options: any) => {
  //     // let token = cookie.getToken();
  //
  //     // if (process.env.NODE_ENV === 'development') {
  //     //   token =
  //     //     'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJjbGllbnRJZFwiOlwiZGVmYXVsdFwiLFwibG9naW5UaW1lXCI6XCIyMDIxLTA2LTMwVDA5OjM1OjI3LjQwMFwiLFwidXNJZFwiOjEsXCJ1c2VyUm9sZVwiOlwiYWRtaW5cIixcInV1SWRcIjpcIjFcIn0iLCJpc3MiOiJhdXRoMCIsImV4cCI6MTk0MDM3NjkyNywiaWF0IjoxNjI1MDE2ODY3fQ.ohOreCyDKmf93FARasOD1QP-3dTJlAGoh5Pcwd3l2bw';
  //     // }
  //     return {
  //       options: {
  //         ...options,
  //         headers: {
  //           ...options.headers,
  //           clientId: 'default',
  //           version: '1.0'
  //           // token
  //         }
  //       }
  //     };
  //   }
  // ]
};
