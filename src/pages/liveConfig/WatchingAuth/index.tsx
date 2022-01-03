import React, { useEffect } from 'react';
import { connect } from 'umi';
import { useImmer } from 'use-immer';
import { Form, Input, message, Spin, Radio } from 'antd';
import ConfirmButton from '@/components/ConfirmButton';
import Background from '@/components/Background';
import { State } from '@/models/userInfo';
import { getPageData, save } from './service';

const { Item } = Form;

interface IProps {
  sid: string;
}

interface IState {
  userInfo: State;
}

const WatchingAuth: React.FC<IProps> = (props) => {
  const { sid } = props;

  const [form] = Form.useForm();

  const [pageLoading, setPageLoading] = useImmer<boolean>(false);
  const [saveLoading, setSaveLoading] = useImmer<boolean>(false);

  useEffect(() => {
    (async function () {
      setPageLoading(true);
      const { msg } = await getPageData(sid);
      setPageLoading(false);
      form.setFieldsValue(msg);
    })();
  }, [form, setPageLoading, sid]);

  const handleSave = async () => {
    setSaveLoading(true);
    const { status } = await save({ sid, ...form.getFieldsValue() });
    setSaveLoading(false);
    if (status === 1) {
      message.success('修改成功');
    } else {
      message.info('请修改参数后提交');
    }
  };

  return (
    <Background>
      <div className="page_title">观看权限设置</div>
      <Spin spinning={pageLoading}>
        <Form form={form} labelCol={{ flex: '80px' }} className="form" autoComplete="off">
          <Item label="权限开关" name="code_off">
            <Radio.Group>
              <Radio value={1}>开</Radio>
              <Radio value={0}>关</Radio>
            </Radio.Group>
          </Item>
          <Item label="提示文字" name="prompt">
            <Input placeholder="请输入提示文字" allowClear />
          </Item>
          <Item label="验证码" name="code">
            <Input placeholder="请输入验证码" allowClear />
          </Item>
        </Form>
      </Spin>
      <ConfirmButton onClick={handleSave} loading={saveLoading} />
    </Background>
  );
};

export default connect(({ userInfo }: IState) => ({
  sid: userInfo.sid
}))(WatchingAuth);
