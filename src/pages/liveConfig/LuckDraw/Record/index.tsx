import React, { useCallback, useEffect } from 'react';
import { connect } from 'umi';
import { useImmer } from 'use-immer';
import { Table, Popconfirm, message } from 'antd';
import dayjs from 'dayjs';
import Background from '@/components/Background';
import Icon from '@/components/Icon';
import { State } from '@/models/userInfo';
import { getPageData, deleteById } from './service';

interface IProps {
  sid: string;
}

interface IState {
  userInfo: State;
}

const Record: React.FC<IProps> = (props) => {
  const { sid } = props;

  const [pageData, setPageData] = useImmer<{ data: any[]; loading: boolean }>({
    data: [],
    loading: false
  });

  const obtainPageData = useCallback(async () => {
    setPageData((draft) => {
      draft.loading = true;
    });
    const data = await getPageData(sid);
    setPageData((draft) => {
      draft.data = data;
      draft.loading = false;
    });
  }, [setPageData, sid]);

  useEffect(() => {
    (async function () {
      await obtainPageData();
    })();
  }, [obtainPageData]);

  const columns = [
    {
      title: '序号',
      width: 60,
      align: 'center' as const,
      ellipsis: true,
      render: (text: any, record: any, index: number) => {
        return index + 1;
      }
    },
    {
      title: '操作',
      width: 60,
      align: 'center' as const,
      render: (text: any, record: { id: number }) => {
        return (
          <Popconfirm
            title="确认删除？"
            onConfirm={async () => {
              await deleteById(record.id);
              message.success('删除成功');
              await obtainPageData();
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
      title: '中奖礼物',
      ellipsis: true,
      dataIndex: 'prize'
    },
    {
      title: '中奖时间',
      width: 180,
      dataIndex: 'addtime',
      render: (text: string) => {
        return dayjs(Number(text)).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  ];

  return (
    <Background>
      <div className="page_title">中奖记录</div>
      <Table
        rowKey="id"
        loading={pageData.loading}
        columns={columns}
        dataSource={pageData.data}
        scroll={{ y: 523 }}
        pagination={false}
      />
    </Background>
  );
};

export default connect(({ userInfo }: IState) => ({
  sid: userInfo.sid
}))(Record);
