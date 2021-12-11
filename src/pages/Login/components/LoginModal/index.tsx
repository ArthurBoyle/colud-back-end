import React from 'react';
import { useDispatch, history } from 'umi';
import { useImmer } from 'use-immer';
import { Button, Form, Input, message, Modal } from 'antd';
import { login } from './service';
import style from './index.less';

const { Item } = Form;

interface IProps {
  visible: boolean;
  closeModal: () => void;
}

const LoginModal: React.FC<IProps> = (props) => {
  const { visible, closeModal } = props;

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [loading, setLoading] = useImmer(false);

  const handleLogin = async () => {
    setLoading(true);
    const params = await form.validateFields();
    const { status, data } = await login(params);
    setLoading(false);
    if (status === 0) {
      message.warn('账号或密码错误');
    } else {
      message.success('登录成功');
      window.localStorage.setItem('user', data.id);
      dispatch({
        type: 'userInfo/getUserInfo',
        callback: () => {
          history.replace('/live-list');
        }
      });
    }
  };

  return (
    <Modal
      visible={visible}
      title="用户登录"
      width={370}
      centered
      maskClosable={false}
      wrapClassName={style.loginModal}
      footer={null}
      destroyOnClose
      onCancel={closeModal}
    >
      <Form form={form} preserve={false}>
        <Item label="账号" name="mobile" required={false} rules={[{ required: true }]}>
          <Input placeholder="请输入账号" />
        </Item>
        <Item label="密码" name="pwd" required={false} rules={[{ required: true }]}>
          <Input.Password placeholder="请输入密码" />
        </Item>
      </Form>
      <Button type="primary" block onClick={handleLogin} loading={loading}>
        登录
      </Button>
    </Modal>
  );
};

export default LoginModal;
