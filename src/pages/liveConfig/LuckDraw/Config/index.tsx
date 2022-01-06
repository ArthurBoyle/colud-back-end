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

const Config: React.FC<IProps> = (props) => {
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
    const { status } = await save({ sid, ...form.getFieldsValue() });
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
        <Form form={form} className={styles.form} autoComplete="off">
          <Item label="功能设置" name="prize_off">
            <Radio.Group>
              <Radio value={1}>开</Radio>
              <Radio value={0}>关</Radio>
            </Radio.Group>
          </Item>
          <Item label="开始时间" name="start_time">
            <DatePicker />
          </Item>
          <Item label="截至时间" name="end_time">
            <DatePicker />
          </Item>
          <Space size="large">
            <Item label="一等奖" name="first_prize">
              <Input />
            </Item>
            <Item label="中奖概率" name="one">
              <InputNumber />
            </Item>
            <Item label="一等奖个数" name="one_count">
              <InputNumber />
            </Item>
          </Space>
          <Space size="large">
            <Item label="二等奖" name="second_award">
              <Input />
            </Item>
            <Item label="中奖概率" name="two">
              <InputNumber />
            </Item>
            <Item label="二等奖个数" name="two_count">
              <InputNumber />
            </Item>
          </Space>
          <Space size="large">
            <Item label="三等奖" name="third_award">
              <Input />
            </Item>
            <Item label="中奖概率" name="three">
              <InputNumber />
            </Item>
            <Item label="三等奖个数" name="three_count">
              <InputNumber />
            </Item>
          </Space>
          <Space size="large">
            <Item label="三等奖" name="fourth_prize">
              <Input />
            </Item>
            <Item label="中奖概率" name="four">
              <InputNumber />
            </Item>
            <Item label="三等奖个数" name="four_count">
              <InputNumber />
            </Item>
          </Space>
          <Space size="large">
            <Item label="三等奖" name="fifth_prize">
              <Input />
            </Item>
            <Item label="中奖概率" name="five">
              <InputNumber />
            </Item>
            <Item label="三等奖个数" name="five_count">
              <InputNumber />
            </Item>
          </Space>
          <Space size="large">
            <Item label="三等奖" name="sixth_prize">
              <Input />
            </Item>
            <Item label="中奖概率" name="six">
              <InputNumber />
            </Item>
            <Item label="三等奖个数" name="six_count">
              <InputNumber />
            </Item>
          </Space>
          <Space size="large">
            <Item label="三等奖" name="seventh_prize">
              <Input />
            </Item>
            <Item label="中奖概率" name="seven">
              <InputNumber />
            </Item>
            <Item label="三等奖个数" name="seven_count">
              <InputNumber />
            </Item>
          </Space>
          <Item label="每人抽奖次数" name="everyone">
            <InputNumber />
          </Item>
        </Form>
      </Spin>
      <ConfirmButton onClick={handleSave} loading={saveLoading} />
    </Background>
  );
};

export default connect(({ userInfo }: IState) => ({
  sid: userInfo.sid
}))(Config);
