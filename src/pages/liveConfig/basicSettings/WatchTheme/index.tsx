import React, { useEffect } from 'react';
import { connect } from 'umi';
import { useImmer } from 'use-immer';
import { Button, Form, Spin, Row, Col, message, Radio } from 'antd';
import Background from '@/components/Background';
import PictureUpload from '@/components/PictureUpload';
import { State } from '@/models/userInfo';
import { get_theme, theme } from './service';

const { Item } = Form;

interface IProps {
  sid: string;
}

interface IState {
  userInfo: State;
}

const WatchTheme: React.FC<IProps> = (props) => {
  const { sid } = props;

  const [form] = Form.useForm();

  const [pageLoading, setPageLoading] = useImmer<boolean>(false);
  const [saveLoading, setSaveLoading] = useImmer<boolean>(false);
  const [color, setColor] = useImmer<string>('#000000');

  useEffect(() => {
    (async function () {
      setPageLoading(true);
      const data = await get_theme(sid);
      setPageLoading(false);
      form.setFieldsValue(data);
      const { bg_color } = data;
      if (bg_color === '#000000') {
        form.setFieldsValue({ radio: 1 });
      } else if (bg_color === '#1890FF') {
        form.setFieldsValue({ radio: 2 });
      } else if (bg_color === '#FA0000') {
        form.setFieldsValue({ radio: 3 });
      } else {
        form.setFieldsValue({ radio: 4 });
      }
    })();
  }, [form, setPageLoading, sid]);

  const handleSave = async () => {
    setSaveLoading(true);
    const { channel_url } = form.getFieldsValue();
    const { status } = await theme({ sid, channel_url, bg_color: color });
    setSaveLoading(false);
    if (status === 1) {
      message.info('请修改参数后提交');
    } else if (status === 0) {
      message.success('保存成功');
    }
  };

  return (
    <Background>
      <div className="page_title">观看主题设置</div>
      <Spin spinning={pageLoading}>
        <Form form={form} layout="vertical">
          <Row>
            <Col span={6}>
              <Item label="频道主题" name="radio">
                <Radio.Group>
                  <Radio
                    value={1}
                    onClick={() => {
                      setColor('#000000');
                    }}
                  >
                    默认
                  </Radio>
                  <Radio
                    value={2}
                    onClick={() => {
                      setColor('#1890FF');
                    }}
                  >
                    科技
                  </Radio>
                  <Radio
                    value={3}
                    onClick={() => {
                      setColor('#FA0000');
                    }}
                  >
                    节日
                  </Radio>
                  <Radio value={4} disabled>
                    自定义
                  </Radio>
                </Radio.Group>
              </Item>
            </Col>
            <Col span={6}>
              <Item label="分享图标" name="channel_url">
                <PictureUpload width={128} height={128} />
              </Item>
            </Col>
            <Col span={6}>
              <Item label="观看颜色背景色">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => {
                    if (form.getFieldValue('radio') !== 4) {
                      form.setFieldsValue({ radio: 4 });
                    }
                    setColor(e.target.value);
                  }}
                />
              </Item>
            </Col>
          </Row>
          <Button type="primary" onClick={handleSave} loading={saveLoading}>
            保存
          </Button>
        </Form>
      </Spin>
    </Background>
  );
};

export default connect(({ userInfo }: IState) => ({
  sid: userInfo.sid
}))(WatchTheme);
