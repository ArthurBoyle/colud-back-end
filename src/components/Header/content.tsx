import React, { useEffect, useRef } from 'react';
import { Input, Button, Space, Form, message } from 'antd';
import QRCode from 'qrcode';
import ClipboardJS from 'clipboard';

const { Item } = Form;

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
    <Form layout="vertical">
      <Item label="观看地址">
        <Space>
          <Input
            disabled
            value={`https://zbqt.hnxsj.vip/index/Index/index?sid=${sid}`}
            style={{ width: 420 }}
          />
          <Button
            className="button"
            data-clipboard-text={`https://zbqt.hnxsj.vip/index/Index/index?sid=${sid}`}
            onClick={async () => {
              const clipboard = new ClipboardJS('.button');
              clipboard.on('success', () => {
                message.success('已复制到剪切板');
              });
            }}
          >
            复制
          </Button>
        </Space>
      </Item>
      <Item label="手机观看二维码">
        <canvas ref={qr} />
      </Item>
    </Form>
  );
};

export default Content;
