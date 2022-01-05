import React, { useEffect } from 'react';
import { connect } from 'umi';
import { useImmer } from 'use-immer';
import { Form, Input, InputNumber, message, Spin, Radio, Space } from 'antd';
import ConfirmButton from '@/components/ConfirmButton';
import Background from '@/components/Background';
import DatePicker from '@/components/DatePicker';
import { State } from '@/models/userInfo';
import { getPageData, save } from './service';
import styles from './index.less';

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
      <div className="page_title">互动打赏设置</div>
      <Spin spinning={pageLoading}>
        <Form form={form} className={styles.form} autoComplete="off">
          <Item label="互动开关" name="vote_off">
            <Radio.Group>
              <Radio value={1}>开</Radio>
              <Radio value={0}>关</Radio>
            </Radio.Group>
          </Item>
          <Item label="投票主题" name="title">
            <Input placeholder="请输入投票主题" allowClear />
          </Item>
          <Item label="截至时间" name="deadline">
            <DatePicker />
          </Item>
          <Item label="问题名称" name="problem">
            <Input placeholder="请输入投票主题" allowClear />
          </Item>
          <Space size="large">
            <Item label="选项一" name="option1">
              <Input />
            </Item>
            <Item label="实际投票数一" name="count1">
              <InputNumber />
            </Item>
            <Item label="虚拟投票数一" name="fictitious1">
              <InputNumber />
            </Item>
          </Space>
          <Space size="large">
            <Item label="选项二" name="option2">
              <Input />
            </Item>
            <Item label="实际投票数二" name="count2">
              <InputNumber />
            </Item>
            <Item label="虚拟投票数二" name="fictitious2">
              <InputNumber />
            </Item>
          </Space>
          <Space size="large">
            <Item label="选项三" name="option3">
              <Input />
            </Item>
            <Item label="实际投票数三" name="count3">
              <InputNumber />
            </Item>
            <Item label="虚拟投票数三" name="fictitious3">
              <InputNumber />
            </Item>
          </Space>
        </Form>
      </Spin>
      <ConfirmButton onClick={handleSave} loading={saveLoading} />
    </Background>
  );
};

export default connect(({ userInfo }: IState) => ({
  sid: userInfo.sid
}))(InteractiveReward);
