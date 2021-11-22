import React from 'react';
import { useImmer } from 'use-immer';
import { Modal, Form, Checkbox, Input, message } from 'antd';
import { createActivity } from './service';
import style from './index.less';

const { Item } = Form;

interface IProps {
  visible: boolean;
  uid: string;
  getData: () => void;
  onCancel: () => void;
}

const NewList: React.FC<IProps> = (props) => {
  const { visible, uid, getData, onCancel } = props;

  const [form] = Form.useForm();

  const [loading, setLoading] = useImmer<boolean>(false);
  const [checked, setChecked] = useImmer<boolean>(false);

  const handleCreate = async () => {
    const params = await form.validateFields();
    params.uid = uid;
    params.choice = '1';
    if (!checked) {
      message.info('请阅读并勾选相关协议');
      return;
    }
    try {
      setLoading(true);
      await createActivity(params);
      message.success('操作成功');
      onCancel();
      getData();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="新建直播"
      width={700}
      destroyOnClose
      confirmLoading={loading}
      onOk={handleCreate}
      onCancel={onCancel}
    >
      <Form form={form} preserve={false} labelCol={{ span: 4 }} autoComplete="off">
        <Item label="频道名称" name="channel_name" rules={[{ required: true }]}>
          <Input placeholder="请输入频道名称" />
        </Item>
        <Item label="播放地址" name="url" rules={[{ required: true }]}>
          <Input placeholder="请输入播放地址" />
        </Item>
        <Item label="AppName" name="app_id" rules={[{ required: true }]}>
          <Input placeholder="请输入AppName" />
        </Item>
        <Item label="StreamName" name="liu_id" rules={[{ required: true }]}>
          <Input placeholder="请输入StreamName" />
        </Item>
      </Form>
      <div className={[style.left, style.height].join(' ')}>
        <div>声明：严禁上传包括反动、暴力、色情、违法、及侵权内容的文件。</div>
        <div className={style.secondLine}>
          平台有义务配合有关部门将上传违规文件的用户信息保存，并保留因配合调查及冻结账号的权利。
        </div>
      </div>
      <Checkbox
        className={style.left}
        checked={checked}
        onChange={() => {
          setChecked((draft) => !draft);
        }}
      >
        我已阅读并同意
      </Checkbox>
    </Modal>
  );
};

export default NewList;
