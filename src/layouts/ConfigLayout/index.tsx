import React, { useEffect } from 'react';
import { connect, history, Dispatch } from 'umi';
import { Layout, Menu } from 'antd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { State as UserInfoState } from '@/models/userInfo';
import style from './index.less';

const { SubMenu, Item } = Menu;

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
      <Header uid={uid} />
      <Layout.Sider className={style.sider}>
        <Menu className={style.menu} mode="inline" selectedKeys={[pathname]}>
          <Item
            key="/chat"
            onClick={() => {
              history.push('/chat');
            }}
          >
            聊天管理
          </Item>
          <SubMenu key="basicSettings" title="基础设置">
            <Item
              key="/play-address"
              onClick={() => {
                history.push('/play-address');
              }}
            >
              播放地址设置
            </Item>
            <Item
              key="/watch-theme"
              onClick={() => {
                history.push('/watch-theme');
              }}
            >
              观看主题设置
            </Item>
            <Item
              key="/visitors-number"
              onClick={() => {
                history.push('/visitors-number');
              }}
            >
              观看人数设置
            </Item>
            <Item
              key="/window-logo"
              onClick={() => {
                history.push('/window-logo');
              }}
            >
              视频窗口Logo设置
            </Item>
            <Item
              key="/live-guide"
              onClick={() => {
                history.push('/live-guide');
              }}
            >
              直播引导图
            </Item>
            <Item
              key="/live-background"
              onClick={() => {
                history.push('/live-background');
              }}
            >
              直播窗口背景
            </Item>
            <Item
              key="/official-account"
              onClick={() => {
                history.push('/official-account');
              }}
            >
              公众号设置
            </Item>
            <Item
              key="/live-detail"
              onClick={() => {
                history.push('/live-detail');
              }}
            >
              活动详情
            </Item>
            <Item
              key="/live-playback"
              onClick={() => {
                history.push('/live-playback');
              }}
            >
              活动回放
            </Item>
          </SubMenu>
          <Item
            key="/tabs-config"
            onClick={() => {
              history.push('/tabs-config');
            }}
          >
            选项卡设置
          </Item>
          <Item
            key="/watching-auth"
            onClick={() => {
              history.push('/watching-auth');
            }}
          >
            观看权限设置
          </Item>
          <SubMenu key="luckDraw" title="幸运抽奖">
            <Item
              key="/luck-draw-config"
              onClick={() => {
                history.push('/luck-draw-config');
              }}
            >
              抽奖设置
            </Item>
            <Item
              key="/luck-draw-record"
              onClick={() => {
                history.push('/luck-draw-record');
              }}
            >
              中奖记录
            </Item>
          </SubMenu>
          <Item
            key="/interactive-voting"
            onClick={() => {
              history.push('/interactive-voting');
            }}
          >
            互动投票设置
          </Item>
          <Item
            key="/interactive-reward"
            onClick={() => {
              history.push('/interactive-reward');
            }}
          >
            互动打赏设置
          </Item>
          <Item
            key="/wechat-sharing"
            onClick={() => {
              history.push('/wechat-sharing');
            }}
          >
            微信分享设置
          </Item>
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
