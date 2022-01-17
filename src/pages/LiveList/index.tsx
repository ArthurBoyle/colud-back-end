import React, { useEffect, useCallback } from 'react';
import { connect, history, Dispatch } from 'umi';
import { useImmer } from 'use-immer';
import { Layout, Form, Card, Avatar, Modal, message, Spin, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewList from './components/NewList';
import { State as UserInfoState } from '@/models/userInfo';
import { getPageData, deleteData } from './service';
import style from './index.less';

const { Content } = Layout;
const { Item, List } = Form;
const { Meta } = Card;

interface IProps {
  dispatch: Dispatch;
  uid: string;
}

const LiveList: React.FC<IProps> = (props) => {
  const { dispatch, uid } = props;

  const [form] = Form.useForm();

  const [pageLoading, setPageLoading] = useImmer<boolean>(false);
  const [newListModal, setNewListModal] = useImmer<boolean>(false);

  const getData = useCallback(async () => {
    setPageLoading(true);
    const data = await getPageData(uid);
    form.setFieldsValue({ dataList: data.reverse() });
    setPageLoading(false);
  }, [form, setPageLoading, uid]);

  useEffect(() => {
    (async function () {
      await getData();
    })();
  }, [getData]);

  const handleDelete = (sid: string) => {
    Modal.confirm({
      title: '删除',
      content: '确定删除此活动吗？',
      onOk: () => {
        return new Promise<void>(async (resolve, reject) => {
          const { status } = await deleteData(uid, sid);
          if (status === 1) {
            resolve();
            message.success('删除成功');
            await getData();
          } else if (status === 0) {
            reject();
            message.error('删除失败');
          }
        });
      }
    });
  };

  const ShowCard = (params: any) => {
    const { sid } = params;
    return (
      <Card
        actions={[
          <div
            onClick={() => {
              window.localStorage.setItem('sid', sid);
              dispatch({
                type: 'userInfo/getSid'
              });
              history.push('/chat');
            }}
          >
            设置
          </div>,
          <div
            onClick={() => {
              handleDelete(sid);
            }}
          >
            删除
          </div>
        ]}
      >
        <Meta
          avatar={<Avatar size={64} src="https://joeschmoe.io/api/v1/random" />}
          title="活动名称"
          description={<div className={style.cardDescription}>{params.value}</div>}
        />
      </Card>
    );
  };

  return (
    <Layout>
      <Header uid={uid} />
      <Content className={style.content}>
        <Spin spinning={pageLoading}>
          <Form form={form}>
            <List name="dataList">
              {(fields) => {
                return (
                  <Row gutter={8}>
                    <Col xs={24} sm={12} lg={8} xl={6}>
                      <Item>
                        <Card
                          className={style.newCard}
                          onClick={() => {
                            setNewListModal(true);
                          }}
                        >
                          <PlusOutlined />
                          <div>新建直播</div>
                        </Card>
                      </Item>
                    </Col>
                    {fields.map((item) => {
                      return (
                        <Col key={item.key} xs={24} sm={12} lg={8} xl={6}>
                          <Item
                            name={[item.name, 'channel_name']}
                            getValueProps={(value) => {
                              return {
                                value,
                                sid: form.getFieldValue(['dataList', item.name, 'sid'])
                              };
                            }}
                          >
                            <ShowCard />
                          </Item>
                        </Col>
                      );
                    })}
                  </Row>
                );
              }}
            </List>
          </Form>
        </Spin>
      </Content>
      <Footer />
      <NewList
        visible={newListModal}
        uid={uid}
        getData={getData}
        onCancel={() => {
          setNewListModal(false);
        }}
      />
    </Layout>
  );
};

export default connect((state: { userInfo: UserInfoState }) => ({
  uid: state.userInfo.uid
}))(LiveList);
