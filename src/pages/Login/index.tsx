import React, { useEffect } from 'react';
import { useDispatch, history } from 'umi';
import { useImmer } from 'use-immer';
import { Button } from 'antd';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import style from './index.less';

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useImmer<boolean>(false);

  useEffect(() => {
    dispatch({
      type: 'userInfo/getUserInfo',
      callback: () => {
        history.replace('/live-list');
      }
    });
  }, [dispatch]);

  return (
    <>
      <div className={style.container}>
        {/*<LoginHeader myRef={myRef} entry="wait" />*/}
        <div className={style.content}>
          <div className={style.title}>视频直播互联网管理系统</div>
          <Button
            type="primary"
            className={style.loginButton}
            onClick={() => {
              setVisible(true);
            }}
          >
            登录
          </Button>
        </div>
        <Footer />
      </div>
      <LoginModal
        visible={visible}
        closeModal={() => {
          setVisible(false);
        }}
      />
    </>
  );
};

export default Login;
