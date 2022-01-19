import React, { useCallback, useEffect } from 'react';
import { connect, Dispatch, Loading } from 'umi';
import { Form, Radio, Table, Popconfirm, message } from 'antd';
import dayjs from 'dayjs';
import Background from '@/components/Background';
import Icon from '@/components/Icon';
import { State as UserInfoState } from '@/models/userInfo';
import { State as ChatState } from './model';

interface IProps {
  dispatch: Dispatch;
  sid: string;
  pageData: any[];
  pageDataLoading: boolean | undefined;
}

interface IState {
  userInfo: UserInfoState;
  chat: ChatState;
  loading: Loading;
}

const Chat: React.FC<IProps> = (props) => {
  const { dispatch, sid, pageData, pageDataLoading } = props;

  const [form] = Form.useForm();

  const getPageData = useCallback(() => {
    dispatch({
      type: 'chat/getPageData',
      payload: sid
    });
  }, [dispatch, sid]);

  useEffect(() => {
    dispatch({
      type: 'chat/getForbiddenWord',
      payload: sid,
      callback: (data) => {
        form.setFieldsValue(data);
      }
    });
    getPageData();
  }, [dispatch, form, getPageData, sid]);

  const handleForbiddenWord = (jinyan: number) => {
    dispatch({
      type: 'chat/changeForbiddenWord',
      payload: { sid, jinyan },
      callback: async () => {
        message.success('操作成功');
      }
    });
  };

  const columns = [
    {
      title: '操作',
      width: 60,
      align: 'center' as const,
      render: (text: any, record: { id: number }) => {
        return (
          <Popconfirm
            title="确认删除？"
            onConfirm={() => {
              dispatch({
                type: 'chat/delChat',
                payload: record.id,
                callback: async () => {
                  message.success('删除成功');
                  getPageData();
                }
              });
            }}
          >
            <Icon fontName="icon-shanchu1" title="删除" />
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

  return (
    <Background>
      <div className="page_title">聊天室管理</div>
      <Form form={form}>
        <Form.Item label="禁言选项" name="jinyan">
          <Radio.Group>
            <Radio
              value={0}
              onClick={() => {
                handleForbiddenWord(0);
              }}
            >
              是
            </Radio>
            <Radio
              value={1}
              onClick={() => {
                handleForbiddenWord(1);
              }}
            >
              否
            </Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
      <Table
        rowKey="id"
        loading={pageDataLoading}
        columns={columns}
        dataSource={pageData}
        scroll={{ y: 523 }}
        pagination={false}
      />
    </Background>
  );
};

export default connect(({ userInfo, chat, loading }: IState) => ({
  sid: userInfo.sid,
  pageData: chat.pageData,
  pageDataLoading: loading.effects['chat/getPageData']
}))(Chat);
