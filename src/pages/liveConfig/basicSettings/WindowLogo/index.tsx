import React, { useEffect } from 'react';
import { connect } from 'umi';
import { useImmer } from 'use-immer';
import { Spin, Form, Radio, message } from 'antd';
import Background from '@/components/Background';
import ConfirmButton from '@/components/ConfirmButton';
import PictureUpload from '@/components/PictureUpload';
import { State } from '@/models/userInfo';
import { getPageData, save } from './service';

const { Item } = Form;

interface IProps {
  sid: string;
}

interface IState {
  userInfo: State;
}

const WindowLogo: React.FC<IProps> = (props) => {
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
      <div className="page_title">视频窗口Logo设置</div>
      <Spin spinning={pageLoading}>
        <Form form={form} labelCol={{ flex: '80px' }}>
          <Item label="显示开关" name="logo_off">
            <Radio.Group>
              <Radio value={0}>开</Radio>
              <Radio value={1}>关</Radio>
            </Radio.Group>
          </Item>
          <Item label="Logo" name="logo">
            <PictureUpload width={128} height={128} />
          </Item>
        </Form>
      </Spin>
      <ConfirmButton onClick={handleSave} loading={saveLoading} />
    </Background>
  );
};

export default connect(({ userInfo }: IState) => ({
  sid: userInfo.sid
}))(WindowLogo);
