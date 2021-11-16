import React, { useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import { useImmer } from 'use-immer';
import { Button, Modal, Form, Input, message } from 'antd';
import Footer from './components/Footer';
import style from './index.less';

const { Item } = Form;

interface IProps {
  dispatch: Dispatch;
}

const Login: React.FC<IProps> = (props) => {
  const { dispatch } = props;

  const [form] = Form.useForm();

  const [visible, setVisible] = useImmer<boolean>(false);

  useEffect(() => {
    dispatch({
      type: 'userInfo/getUserInfo'
    });
  }, [dispatch]);

  const handleLogin = async () => {
    const params = await form.validateFields();
    dispatch({
      type: 'userInfo/login',
      payload: params,
      callback: (result: any) => {
        if (result) {
          const { status, data } = result;
          if (status === 0) {
            message.warn('账号或密码错误');
          } else {
            message.success('登录成功');
            window.localStorage.setItem('user', data.id);
            dispatch({
              type: 'userInfo/getUserInfo'
            });
          }
        }
      }
    });
  };

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
              setVisible(() => true);
            }}
          >
            登录
          </Button>
        </div>
        <Footer />
      </div>
      <Modal
        visible={visible}
        title="用户登录"
        width={370}
        centered
        maskClosable={false}
        wrapClassName={style.loginModal}
        footer={null}
        destroyOnClose
        onCancel={() => {
          setVisible(() => false);
        }}
      >
        <Form form={form} preserve={false}>
          <Item label="账号" name="mobile" required={false} rules={[{ required: true }]}>
            <Input placeholder="请输入账号" />
          </Item>
          <Item label="密码" name="pwd" required={false} rules={[{ required: true }]}>
            <Input.Password placeholder="请输入密码" />
          </Item>
        </Form>
        <Button type="primary" block onClick={handleLogin}>
          登录
        </Button>
      </Modal>
    </>
  );
};

export default connect()(Login);
