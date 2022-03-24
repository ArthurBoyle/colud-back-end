import React from 'react';
import { request } from 'umi';
import { useImmer } from 'use-immer';
import { Button, Upload, Modal, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import style from './index.less';

interface IProps {
  value?: any;
  onChange?: (file: string | undefined) => void;
  disabled?: boolean;
  width: number;
  height: number;
  picSize: number;
}

const PictureUpload: React.FC<IProps> = (props) => {
  const { value, onChange, disabled, width, height, picSize } = props;

  const [loading, setLoading] = useImmer<boolean>(false);
  const [visible, setVisible] = useImmer<boolean>(false);

  const beforeUpload = async (file: any) => {
    const { type, size } = file;
    const isJpgOrPng = type === 'image/jpeg' || type === 'image/png';
    if (!isJpgOrPng) {
      message.error('仅支持 JPG/PNG 类型的文件!');
      return;
    }
    const isLt2M = (size / 1024 / 1024) * 1000 < picSize;
    if (!isLt2M) {
      message.error(`图片必须小于 ${picSize}KB!`);
      return;
    }
    return isJpgOrPng && isLt2M;
  };

  const customRequest = (options: any) => {
    setLoading(true);
    const { file } = options;
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onload = (e) => {
      request('api/admin/Uploads/uploads', {
        method: 'post',
        data: { pic: e.target?.result }
      }).then((data) => {
        setLoading(false);
        onChange?.(data.url);
      });
    };
  };

  return (
    <>
      <Upload
        accept=".png,.jpg,.jpeg"
        showUploadList={false}
        beforeUpload={beforeUpload}
        customRequest={customRequest}
      >
        {value ? (
          <div
            className={disabled ? style.disabled : style.valueContainer}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <img src={value} alt="" width={width} height={height} />
            {!disabled && (
              <span className={style.buttonList}>
                <span
                  title="查看"
                  className="iconfont icon-chakan1"
                  onClick={() => {
                    setVisible(true);
                  }}
                />
                <span
                  title="删除"
                  className="iconfont icon-shanchu1"
                  onClick={() => {
                    onChange?.(undefined);
                  }}
                />
              </span>
            )}
          </div>
        ) : (
          <div className={style.uploadContainer} style={{ width, height }}>
            <div className={style.content}>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div>Upload</div>
            </div>
          </div>
        )}
      </Upload>
      <Modal
        visible={visible}
        width={650}
        closable={false}
        maskClosable={false}
        footer={
          <Button
            onClick={() => {
              setVisible(false);
            }}
          >
            关闭
          </Button>
        }
      >
        <img src={value} alt="" width={602} />
      </Modal>
    </>
  );
};

export default PictureUpload;
