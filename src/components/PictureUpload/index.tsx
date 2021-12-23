import React from 'react';
import { request } from 'umi';
import { useImmer } from 'use-immer';
import { Upload, Modal, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Icon from '@/components/Icon';
import style from './index.less';

interface IProps {
  value?: any;
  onChange?: (file: string | undefined) => void;
  width?: number;
  height?: number;
}

const PictureUpload: React.FC<IProps> = (props) => {
  const { value, onChange, width, height } = props;

  const [loading, setLoading] = useImmer<boolean>(false);
  const [modalState, setModalState] = useImmer<{ visible: boolean; name: string }>({
    visible: false,
    name: ''
  });

  const beforeUpload = async (file: any) => {
    const { type, size } = file;
    const isJpgOrPng = type === 'image/jpeg' || type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = size / 1024 / 1024 < 0.2;
    if (!isLt2M) {
      message.error('Image must smaller than 200KB!');
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
        setModalState((draft) => {
          draft.name = file.name;
        });
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
            className={style.valueContainer}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <img src={value} alt="" width={width} height={height} />
            <span className={style.buttonList}>
              <Icon
                title="查看"
                fontName="icon-chakan1"
                style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: 20, marginRight: 20 }}
                onClick={() => {
                  setModalState((draft) => {
                    draft.visible = true;
                  });
                }}
              />
              <Icon
                title="删除"
                fontName="icon-shanchu1"
                style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: 20 }}
                onClick={() => {
                  onChange?.(undefined);
                }}
              />
            </span>
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
        visible={modalState.visible}
        title={modalState.name}
        width={650}
        maskClosable={false}
        footer={false}
        onCancel={() => {
          setModalState((draft) => {
            draft.visible = false;
          });
        }}
      >
        <img src={value} alt={modalState.name} width={602} />
      </Modal>
    </>
  );
};

export default PictureUpload;
