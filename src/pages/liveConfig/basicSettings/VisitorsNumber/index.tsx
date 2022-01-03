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
      <div className="page_title">观看人数设置</div>
      <Spin spinning={pageLoading}>
        <Form form={form}>
          <Item label="显示开关" name="off">
            <Radio.Group>
              <Radio value={0}>开</Radio>
              <Radio value={1}>关</Radio>
            </Radio.Group>
          </Item>
          <Item label="增加形式" extra="显示观众人数=基础人数+显示人数*倍数">
            <Item label="基础人数" name="is_default">
              <InputNumber addonAfter="人" />
            </Item>
            <Item label="显示人数" name="is_renshu">
              <InputNumber addonAfter="倍" />
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
