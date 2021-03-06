import React, { useEffect } from 'react';
import { connect } from 'umi';
import { useImmer } from 'use-immer';
import { Form, Input, message, Spin } from 'antd';
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

const TabsConfig: React.FC<IProps> = (props) => {
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
    const values = await form.validateFields();
    setSaveLoading(true);
    const { status } = await save({ sid, ...values });
    setSaveLoading(false);
    if (status === 1) {
      message.success('修改成功');
    } else {
      message.info('请修改参数后提交');
    }
  };

  return (
    <Background>
      <div className="page_title">选项卡设置</div>
      <Spin spinning={pageLoading}>
        <Form form={form} className="form" autoComplete="off">
          <Item
            label="选项卡1"
            name="title1"
            rules={[{ required: true, message: '请输入选项卡名称' }]}
          >
            <Input placeholder="请输入选项卡名称" allowClear />
          </Item>
          <Item
            label="选项卡2"
            name="title2"
            rules={[{ required: true, message: '请输入选项卡名称' }]}
          >
            <Input placeholder="请输入选项卡名称" allowClear />
          </Item>
          <Item
            label="选项卡3"
            name="title3"
            rules={[{ required: true, message: '请输入选项卡名称' }]}
          >
            <Input placeholder="请输入选项卡名称" allowClear />
          </Item>
        </Form>
      </Spin>
      <ConfirmButton onClick={handleSave} loading={saveLoading} />
    </Background>
  );
};

export default connect(({ userInfo }: IState) => ({
  sid: userInfo.sid
}))(TabsConfig);
