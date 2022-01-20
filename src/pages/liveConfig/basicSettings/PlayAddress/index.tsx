import React, { useEffect } from 'react';
import { connect } from 'umi';
import { useImmer } from 'use-immer';
import { Form, Input, message, Spin } from 'antd';
import Background from '@/components/Background';
import ConfirmButton from '@/components/ConfirmButton';
import { State } from '@/models/userInfo';
import { getLiveTel, updateLiveTel } from './service';
import style from './index.less';

const { Item } = Form;

interface IProps {
  sid: string;
}

interface IState {
  userInfo: State;
}

const PlayAddress: React.FC<IProps> = (props) => {
  const { sid } = props;

  const [form] = Form.useForm();

  const [loading, setLoading] = useImmer<boolean>(false);
  const [updateLoading, setUpdateLoading] = useImmer<boolean>(false);

  useEffect(() => {
    (async function () {
      setLoading(true);
      const { msg } = await getLiveTel(sid);
      form.setFieldsValue(msg);
      setLoading(false);
    })();
  }, [form, setLoading, sid]);

  const handleUpdate = async () => {
    const data = await form.validateFields();
    setUpdateLoading(true);
    data.val = data.channel_name;
    data.valb = data.url;
    delete data.channel_name;
    delete data.url;
    const result = await updateLiveTel(sid, data);
    setUpdateLoading(false);
    const { status } = result;
    if (status === 0) {
      message.info('请修改参数后提交');
    } else if (status === 1) {
      message.success('保存成功');
    }
  };

  return (
    <Background>
      <div className="page_title">播放地址设置</div>
      <Spin spinning={loading}>
        <Form autoComplete="off" className={style.form} form={form} labelCol={{ flex: '120px' }}>
          <Item label="频道名称" name="channel_name" rules={[{ required: true }]}>
            <Input placeholder="请输入频道名称" allowClear />
          </Item>
          <Item label="播放地址" name="url" rules={[{ required: true }]}>
            <Input placeholder="请输入播放地址" allowClear />
          </Item>
          <Item label="AppName" name="app_id" rules={[{ required: true }]}>
            <Input placeholder="请输入AppName" allowClear />
          </Item>
          <Item label="StreamName" name="liu_id" rules={[{ required: true }]}>
            <Input placeholder="请输入StreamName" allowClear />
          </Item>
        </Form>
      </Spin>
      <ConfirmButton onClick={handleUpdate} loading={updateLoading} />
    </Background>
  );
};

export default connect(({ userInfo }: IState) => ({
  sid: userInfo.sid
}))(PlayAddress);
