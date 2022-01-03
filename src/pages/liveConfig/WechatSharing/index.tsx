import React, { useEffect } from 'react';
import { connect } from 'umi';
import { useImmer } from 'use-immer';
import { Form, Input, message, Spin, Radio } from 'antd';
import Background from '@/components/Background';
import ConfirmButton from '@/components/ConfirmButton';
import PictureUpload from '@/components/PictureUpload';
import { State } from '@/models/userInfo';
import { getPageData, getTheme, save } from './service';
import style from './index.less';

const { Item } = Form;

interface IProps {
  sid: string;
}

interface IState {
  userInfo: State;
}

const WechatSharing: React.FC<IProps> = (props) => {
  const { sid } = props;

  const [form] = Form.useForm();

  const [pageLoading, setPageLoading] = useImmer<boolean>(false);
  const [saveLoading, setSaveLoading] = useImmer<boolean>(false);

  useEffect(() => {
    (async function () {
      setPageLoading(true);
      const { channel_url } = await getTheme(sid);
      const data = await getPageData(sid);
      setPageLoading(false);
      form.setFieldsValue({ channel_url, ...data });
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
      <div className="page_title">选项卡设置</div>
      <Spin spinning={pageLoading}>
        <Form form={form} autoComplete="off" className={style.form}>
          <Item label="是否开启分享" name="wx_off">
            <Radio.Group>
              <Radio value={0}>开</Radio>
              <Radio value={1}>关</Radio>
            </Radio.Group>
          </Item>
          <Item label="分享图标" name="channel_url">
            <PictureUpload disabled width={128} height={128} />
          </Item>
          <Item>
            <div className={style.title}>设置【发送给朋友】</div>
            <Item label="标题" name="wx_title">
              <Input placeholder="请输入标题" allowClear />
            </Item>
            <Item label="摘要" name="wx_friend">
              <Input.TextArea placeholder="请输入内容" allowClear rows={4} />
            </Item>
          </Item>
          <Item>
            <div className={style.title}>设置【发送到朋友圈】</div>
            <Item label="摘要" name="wx_circle">
              <Input.TextArea placeholder="请输入内容" allowClear rows={4} />
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
}))(WechatSharing);
