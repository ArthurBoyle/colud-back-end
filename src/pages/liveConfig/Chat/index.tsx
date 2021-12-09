import React, { useCallback, useEffect } from 'react';
import { connect } from 'umi';
import { Form, Radio, Table, Popconfirm, message } from 'antd';
import dayjs from 'dayjs';
import Background from '@/components/Background';
import Icon from '@/components/Icon';
import { State as UserInfoState } from '@/models/userInfo';
import { get_jinyan, send, is_jinyan, delChat } from '@/pages/liveConfig/Chat/service';
import { useImmer } from 'use-immer';

interface IProps {
  sid: string;
}

const Chat: React.FC<IProps> = (props) => {
  const { sid } = props;

  const [form] = Form.useForm();

  const [tableData, setTableData] = useImmer<{ loading: boolean; dataSource: any[] }>({
    loading: false,
    dataSource: []
  });

  const getForbiddenWord = useCallback(async () => {
    const data = await get_jinyan(sid);
    form.setFieldsValue(data);
  }, [form, sid]);

  const getData = useCallback(async () => {
    try {
      setTableData((draft) => {
        draft.loading = true;
      });
      const data = await send(sid);
      setTableData((draft) => {
        draft.dataSource = data;
      });
    } finally {
      setTableData((draft) => {
        draft.loading = false;
      });
    }
  }, [setTableData, sid]);

  useEffect(() => {
    (async function iife() {
      await getForbiddenWord();
    })();
    (async function iife() {
      await getData();
    })();
  }, [getData, getForbiddenWord]);

  const columns = [
    {
      title: '操作',
      width: 60,
      align: 'center' as const,
      render: (text: any, record: { id: number }) => {
        return (
          <Popconfirm
            title="确认删除？"
            onConfirm={async () => {
              await delChat(record.id);
              await getData();
            }}
          >
            <Icon fontName="iconshanchu1" title="删除" />
          </Popconfirm>
        );
      }
    },
    {
      title: '用户名',
      width: 200,
      ellipsis: true,
      dataIndex: 'nickname'
    },
    {
      title: '内容',
      ellipsis: true,
      dataIndex: 'content'
    },
    {
      title: '时间',
      width: 180,
      dataIndex: 'chat_time',
      render: (text: string) => {
        return dayjs(Number(text)).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  ];

  const handleForbiddenWord = async (isForbiddenWord: number) => {
    await is_jinyan(sid, isForbiddenWord);
    message.success('操作成功');
  };

  return (
    <Background fillScreen={true} hasFooter={false}>
      <div className="page_title">聊天室管理</div>
      <Form form={form}>
        <Form.Item label="禁言选项" name="jinyan">
          <Radio.Group>
            <Radio
              value={0}
              onClick={async () => {
                await handleForbiddenWord(0);
              }}
            >
              是
            </Radio>
            <Radio
              value={1}
              onClick={async () => {
                await handleForbiddenWord(1);
              }}
            >
              否
            </Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
      <Table
        rowKey="id"
        loading={tableData.loading}
        columns={columns}
        dataSource={tableData.dataSource}
        scroll={{ y: 523 }}
        pagination={false}
      />
    </Background>
  );
};

export default connect((state: { userInfo: UserInfoState }) => ({
  sid: state.userInfo.sid
}))(Chat);
