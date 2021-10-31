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
    /*<>
      <Container>
        <Carousel ref={myRef} autoplay autoplaySpeed={30000} dots={false}>
          {bjImageList.map((url, index) => {
            return (
              <div key={-index}>
                <div
                  style={{
                    width: '100vw',
                    height: '100vh',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundOrigin: 'center',
                    backgroundImage: `url(${url})`,
                    backgroundSize: '100% 100%'
                  }}
                />
              </div>
            );
          })}
        </Carousel>
        <Content>
          <LoginHeader myRef={myRef} entry="wait" />
          <div className="bgContent">
            <div>
              <img src={mainText} alt="" />
            </div>
            <Button
              type="primary"
              className="loginButton"
              onClick={() => {
                setVisible(() => true);
              }}
            >
              登录
            </Button>
          </div>
          <LoginFooter />
        </Content>
      </Container>
      <Modal
        visible={visible}
        width={370}
        destroyOnClose
        footer={null}
        onCancel={() => setVisible(() => false)}
        closable={true}
        centered={true}
        bodyStyle={{
          width: 370,
          height: 332,
          background: '#ffffff',
          borderRadius: 10,
          boxShadow: '0 2px 37px 0 rgba(0, 0, 0, 0.26)',
          padding: 32
        }}
      >
        <ModalStyle>
          <Form form={form} preserve={false}>
            <div className="title">用户登录</div>
            <div className="form">
              <Form.Item
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: '请输入手机号'
                  },
                  {
                    type: 'string',
                    message: '请输入正确的手机号码！',
                    pattern: Pattern.mobile.reg
                  }
                ]}
              >
                <Input style={{ fontSize: 14 }} size="large" placeholder="请输入手机号" />
              </Form.Item>
              <Form.Item
                name="code"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码'
                  }
                ]}
              >
                <SendCodeInput
                  size="large"
                  sendType={SendType.Hire}
                  placeholder="请输入验证码"
                  onClick={onClick}
                  spanStyle={{ marginLeft: 16 }}
                />
              </Form.Item>
              <Form.Item>
                <Button loading={loading} block type="primary" onClick={onLogin} htmlType="submit">
                  登录
                </Button>
              </Form.Item>
            </div>
          </Form>
        </ModalStyle>
      </Modal>
    </>*/
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
