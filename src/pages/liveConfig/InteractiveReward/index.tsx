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

const InteractiveReward: React.FC<IProps> = (props) => {
  const { sid } = props;

  const [form] = Form.useForm();

  const [pageLoading, setPageLoading] = useImmer<boolean>(false);
  const [saveLoading, setSaveLoading] = useImmer<boolean>(false);

  useEffect(() => {
    (async function () {
      setPageLoading(true);
      const data = await getPageData(sid);
      setPageLoading(false);
      form.setFieldsValue(data);
    })();
  }, [form, setPageLoading, sid]);

  const handleSave = async () => {
    setSaveLoading(true);
    const { reward_off, reward_msg } = form.getFieldsValue();
    const { status } = await save({ sid, reward_off, name: reward_msg });
    setSaveLoading(false);
    if (status === 0) {
      message.success('修改成功');
    } else {
      message.info('请修改参数后提交');
    }
  };

  return (
    <Background>
      <div className="page_title">互动打赏设置</div>
      <Spin spinning={pageLoading}>
        <Form form={form} labelCol={{ flex: '90px' }} className="form" autoComplete="off">
          <Item label="打赏开关" name="reward_off">
            <Radio.Group>
              <Radio value={0}>开</Radio>
              <Radio value={1}>关</Radio>
            </Radio.Group>
          </Item>
          <Item label="打赏宣传语" name="reward_msg">
            <Input placeholder="请输入打赏宣传语" allowClear />
          </Item>
        </Form>
      </Spin>
      <ConfirmButton onClick={handleSave} loading={saveLoading} />
    </Background>
  );
};

export default connect(({ userInfo }: IState) => ({
  sid: userInfo.sid
}))(InteractiveReward);
