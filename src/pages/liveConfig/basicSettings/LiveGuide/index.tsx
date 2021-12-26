import React, { useEffect } from 'react';
import { connect } from 'umi';
import { useImmer } from 'use-immer';
import { Spin, Form, Space, Radio, message } from 'antd';
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

const LiveGuide: React.FC<IProps> = (props) => {
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
      <div className="page_title">直播引导图</div>
      <Spin spinning={pageLoading}>
        <Form form={form}>
          <Space size={50} align="start">
            <Item
              label="显示开关"
              name="bdt_off"
              extra="此图片在进入直播页面之前，用于展示直播相关内容"
            >
              <Radio.Group>
                <Radio value={0}>开</Radio>
                <Radio value={1}>关</Radio>
              </Radio.Group>
            </Item>
            <Item label="Logo" name="bdt">
              <PictureUpload width={216} height={384} />
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
}))(LiveGuide);
