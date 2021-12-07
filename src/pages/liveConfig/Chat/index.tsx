import React from 'react';
import { Table } from 'antd';
import Background from '@/components/Background';

const Chat: React.FC = () => {
  const columns = [
    {
      title: '操作',
      render: () => {
        return <div>删除</div>;
      }
    },
    {
      title: '用户名',
      dataIndex: 'nickname'
    },
    {
      title: '内容',
      dataIndex: 'content'
    },
    {
      title: '时间',
      dataIndex: 'chat_time'
    }
  ];

  const dataSource = [
    {
      id: 3047,
      content: '厉害',
      chat_time: '1635499736000',
      uid: '17739',
      nickname: '『BLU』',
      headimgurl:
        'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoz46M4O745Owyea25OmS0beKeFXBrstyPUjWMlzNyiaUp468iaEDQornVz1XNTfF9yazRIJf86fclw/132',
      status: 1,
      sid: '10226e124'
    },
    {
      id: 3046,
      content: '/:strong /:strong/:strong/:strong ',
      chat_time: '1635499707000',
      uid: '17714',
      nickname: '纪小国',
      headimgurl:
        'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqtB4ApXO9DP23w84tq56jXnyS6j2Mc2UjEMBQb4yWYlS1icMckxh3RoMlLm3MY2uwLEXbGPbF4jrg/132',
      status: 1,
      sid: '10226e124'
    },
    {
      id: 3045,
      content: '不错',
      chat_time: '1635499650000',
      uid: '17734',
      nickname: 'Feelings',
      headimgurl:
        'https://thirdwx.qlogo.cn/mmopen/vi_32/4JBT8wO4nqx7oeJPhRuD6lMg1ZK1LdHdg1oWAVvHnYiaTjYsETOpFqwzBunicxtXp9VFC8rbyMiazpR8A6vKrXrpQ/132',
      status: 1,
      sid: '10226e124'
    },
    {
      id: 3044,
      content: '进来啦！',
      chat_time: '1635235428000',
      uid: null,
      nickname: '',
      headimgurl: '',
      status: 1,
      sid: '10226e124'
    },
    {
      id: 3043,
      content: '开始了',
      chat_time: '1635235411000',
      uid: '17681',
      nickname: '徐夫元',
      headimgurl:
        'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL0cc17kldTtxWyh8USsJXrGwFoBEz51QkQs8oiaLJqqx1DZbSicDfOTtA9dWhSZQ0fYtMszygaqHpQ/132',
      status: 1,
      sid: '10226e124'
    },
    {
      id: 3042,
      content: '开始了吗？',
      chat_time: '1635235171000',
      uid: '11935',
      nickname: '黄继红',
      headimgurl:
        'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIUaXcWBJUtt7Rbibw4wiclhoaNYLcx5Iia7GJibfgY2XA0Cec6eUe0ibj4jvVHKlArYEVdL9EvibQT9UUw/132',
      status: 1,
      sid: '10226e124'
    },
    {
      id: 3041,
      content: '怎么没有声音',
      chat_time: '1635215330000',
      uid: null,
      nickname: '',
      headimgurl: '',
      status: 1,
      sid: '10226e124'
    },
    {
      id: 3040,
      content: '哈哈',
      chat_time: '1635215313000',
      uid: null,
      nickname: '',
      headimgurl: '',
      status: 1,
      sid: '10226e124'
    },
    {
      id: 3039,
      content: '哈哈',
      chat_time: '1635215313000',
      uid: null,
      nickname: '',
      headimgurl: '',
      status: 1,
      sid: '10226e124'
    },
    {
      id: 3047,
      content: '厉害',
      chat_time: '1635499736000',
      uid: '17739',
      nickname: '『BLU』',
      headimgurl:
        'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoz46M4O745Owyea25OmS0beKeFXBrstyPUjWMlzNyiaUp468iaEDQornVz1XNTfF9yazRIJf86fclw/132',
      status: 1,
      sid: '10226e124'
    },
    {
      id: 3046,
      content: '/:strong /:strong/:strong/:strong ',
      chat_time: '1635499707000',
      uid: '17714',
      nickname: '纪小国',
      headimgurl:
        'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqtB4ApXO9DP23w84tq56jXnyS6j2Mc2UjEMBQb4yWYlS1icMckxh3RoMlLm3MY2uwLEXbGPbF4jrg/132',
      status: 1,
      sid: '10226e124'
    },
    {
      id: 3045,
      content: '不错',
      chat_time: '1635499650000',
      uid: '17734',
      nickname: 'Feelings',
      headimgurl:
        'https://thirdwx.qlogo.cn/mmopen/vi_32/4JBT8wO4nqx7oeJPhRuD6lMg1ZK1LdHdg1oWAVvHnYiaTjYsETOpFqwzBunicxtXp9VFC8rbyMiazpR8A6vKrXrpQ/132',
      status: 1,
      sid: '10226e124'
    },
    {
      id: 3044,
      content: '进来啦！',
      chat_time: '1635235428000',
      uid: null,
      nickname: '',
      headimgurl: '',
      status: 1,
      sid: '10226e124'
    },
    {
      id: 3043,
      content: '开始了',
      chat_time: '1635235411000',
      uid: '17681',
      nickname: '徐夫元',
      headimgurl:
        'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL0cc17kldTtxWyh8USsJXrGwFoBEz51QkQs8oiaLJqqx1DZbSicDfOTtA9dWhSZQ0fYtMszygaqHpQ/132',
      status: 1,
      sid: '10226e124'
    },
    {
      id: 3042,
      content: '开始了吗？',
      chat_time: '1635235171000',
      uid: '11935',
      nickname: '黄继红',
      headimgurl:
        'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIUaXcWBJUtt7Rbibw4wiclhoaNYLcx5Iia7GJibfgY2XA0Cec6eUe0ibj4jvVHKlArYEVdL9EvibQT9UUw/132',
      status: 1,
      sid: '10226e124'
    },
    {
      id: 3041,
      content: '怎么没有声音',
      chat_time: '1635215330000',
      uid: null,
      nickname: '',
      headimgurl: '',
      status: 1,
      sid: '10226e124'
    },
    {
      id: 3040,
      content: '哈哈',
      chat_time: '1635215313000',
      uid: null,
      nickname: '',
      headimgurl: '',
      status: 1,
      sid: '10226e124'
    },
    {
      id: 3039,
      content: '哈哈',
      chat_time: '1635215313000',
      uid: null,
      nickname: '',
      headimgurl: '',
      status: 1,
      sid: '10226e124'
    }
  ];

  return (
    <Background fillScreen={true} hasFooter={false}>
      <div className="page_title">聊天室管理</div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ y: 550 }}
      />
    </Background>
  );
};

export default Chat;
