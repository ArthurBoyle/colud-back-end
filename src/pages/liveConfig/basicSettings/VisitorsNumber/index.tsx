import React, { useEffect } from 'react';
import { connect } from 'umi';
import { useImmer } from 'use-immer';
import { Spin, Form, Radio, InputNumber, message } from 'antd';
import Background from '@/components/Background';
import ConfirmButton from '@/components/ConfirmButton';
import { State } from '@/models/userInfo';
import { getPageData, save } from './service';

const { Item } = Form;

interface IProps {
  sid: string;
}

interface IState {
  userInfo: State;
}

const VisitorsNumber: React.FC<IProps> = (props) => {
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
    const values = await form.validateFields();
    setSaveLoading(true);
    const { status } = await save({ sid, ...values });
    setSaveLoading(false);
    if (status === 0) {
      message.success('修改成功');
    } else {
      message.info('请修改参数后提交');
    }
  };

  return (
    <Background>
      <div className="page_title">观看人数设置</div>
      <Spin spinning={pageLoading}>
        <Form form={form} requiredMark={false}>
          <Item label="显示开关" name="off">
            <Radio.Group>
              <Radio value={0}>开</Radio>
              <Radio value={1}>关</Radio>
            </Radio.Group>
          </Item>
          <Item label="增加形式" extra="显示观众人数 = 基础人数 + 显示人数 * 倍数">
            <Item
              label="基础人数"
              name="is_default"
              rules={[
                { required: true },
                { pattern: /^(0|[0-9]*|-[0-9]*)$/, message: '基础人数必须为整数' }
              ]}
            >
              <InputNumber placeholder="请输入基础人数" addonAfter="人" />
            </Item>
            <Item
              label="显示人数"
              name="is_renshu"
              validateFirst
              rules={[
                { required: true },
                { type: 'number', min: 1, message: '显示人数不能小于1倍' },
                { pattern: /^([0-9]*)$/, message: '显示人数必须为整数' }
              ]}
            >
              <InputNumber placeholder="请输入显示人数" addonAfter="倍" />
            </Item>
          </Item>
        </Form>
      </Spin>
      <ConfirmButton onClick={handleSave} loading={saveLoading} />
    </Background>
  );
};

export default connect(({ userInfo }: IState) => ({
  sid: userInfo.sid
}))(VisitorsNumber);
