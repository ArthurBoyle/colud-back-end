import React, { useEffect, useRef } from 'react';
import { Form, Typography, Input } from 'antd';
import QRCode from 'qrcode';
import style from './content.less';

const { Item } = Form;
const { Paragraph } = Typography;

interface IProps {
  sid: string;
}

const Content: React.FC<IProps> = (props) => {
  const { sid } = props;

  const qr = useRef<any>();

  useEffect(() => {
    QRCode.toCanvas(
      qr.current,
      `https://zbqt.hnxsj.vip/index/Index/index?sid=${sid}`,
      { margin: 0 },
      () => {}
    );
  }, [sid]);

  return (
    <Form className={style.container} layout="vertical">
      <Item label="观看地址">
        <Paragraph copyable={{ text: `https://zbqt.hnxsj.vip/index/Index/index?sid=${sid}` }}>
          <Input disabled value={`https://zbqt.hnxsj.vip/index/Index/index?sid=${sid}`} />
        </Paragraph>
      </Item>
      <Item label="手机观看二维码">
        <canvas ref={qr} />
      </Item>
    </Form>
  );
};

export default Content;
