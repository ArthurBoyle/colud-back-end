import React, { useEffect } from 'react';
import { connect, history, Dispatch } from 'umi';
import { Layout, Menu } from 'antd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { State as UserInfoState } from '@/models/userInfo';
import style from './index.less';

interface IProps {
  dispatch: Dispatch;
  uid: string;
}

const ConfigLayout: React.FC<IProps> = (props) => {
  const { dispatch, uid } = props;

  const { pathname } = history.location;

  useEffect(() => {
    dispatch({
      type: 'userInfo/getSid'
    });
  }, [dispatch]);

  return (
    <Layout>
      <Header uid={uid} pageLoading={false} />
      <Layout.Sider className={style.sider}>
        <Menu className={style.menu} mode="inline" selectedKeys={[pathname]}>
          <Menu.Item
            key="/chat"
            onClick={() => {
              history.push('/chat');
            }}
          >
            聊天管理
          </Menu.Item>
          <Menu.SubMenu key="basicSettings" title="基础设置">
            <Menu.Item
              key="/play-address"
              onClick={() => {
                history.push('/play-address');
              }}
            >
              播放地址设置
            </Menu.Item>
            <Menu.Item
              key="/watch-theme"
              onClick={() => {
                history.push('/watch-theme');
              }}
            >
              观看主题页设置
            </Menu.Item>
            <Menu.Item
              key="/visitors-number"
              onClick={() => {
                history.push('/visitors-number');
              }}
            >
              观看人数设置
            </Menu.Item>
            <Menu.Item
              key="/window-logo"
              onClick={() => {
                history.push('/window-logo');
              }}
            >
              视频窗口Logo设置
            </Menu.Item>
            <Menu.Item
              key="/live-guide"
              onClick={() => {
                history.push('/live-guide');
              }}
            >
              直播引导图
            </Menu.Item>
            <Menu.Item
              key="/live-background"
              onClick={() => {
                history.push('/live-background');
              }}
            >
              直播窗口背景
            </Menu.Item>
            <Menu.Item
              key="/official-account"
              onClick={() => {
                history.push('/official-account');
              }}
            >
              公众号设置
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item
            key="/tabs-config"
            onClick={() => {
              history.push('/tabs-config');
            }}
          >
            选项卡设置
          </Menu.Item>
          <Menu.Item
            key="/watching-auth"
            onClick={() => {
              history.push('/watching-auth');
            }}
          >
            观看权限设置
          </Menu.Item>
          <Menu.SubMenu key="sub2" title="subnav 2">
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="sub3" title="subnav 3">
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item
            key="/interactive-reward"
            onClick={() => {
              history.push('/interactive-reward');
            }}
          >
            互动打赏设置
          </Menu.Item>
          <Menu.SubMenu key="sub4" title="subnav 4">
            <Menu.Item key="13">option13</Menu.Item>
            <Menu.Item key="14">option14</Menu.Item>
            <Menu.Item key="15">option15</Menu.Item>
            <Menu.Item key="16">option16</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Layout.Sider>
      <Layout className={style.contentLayout}>
        <Layout.Content className={style.content}>{props.children}</Layout.Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default connect((state: { userInfo: UserInfoState }) => ({
  uid: state.userInfo.uid
}))(ConfigLayout);
