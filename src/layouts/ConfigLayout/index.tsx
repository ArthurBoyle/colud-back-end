import React from 'react';
import { connect } from 'umi';
import { Layout, Menu } from 'antd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { State as UserInfoState } from '@/models/userInfo';

interface IProps {
  uid: string;
}

const ConfigLayout: React.FC<IProps> = (props) => {
  const { uid } = props;

  return (
    <Layout>
      <Header uid={uid} pageLoading={false} />
      <Layout.Sider
        style={{
          position: 'fixed',
          top: 48,
          height: '100%',
          boxShadow: '2px 0 8px 0 rgb(29 35 41 / 5%)'
        }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{
            height: '100%',
            paddingTop: 12
          }}
        >
          <Menu.SubMenu key="sub1" title="subnav 1">
            <Menu.Item key="1">option1</Menu.Item>
            <Menu.Item key="2">option2</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          </Menu.SubMenu>
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
          <Menu.SubMenu key="sub4" title="subnav 4">
            <Menu.Item key="13">option13</Menu.Item>
            <Menu.Item key="14">option14</Menu.Item>
            <Menu.Item key="15">option15</Menu.Item>
            <Menu.Item key="16">option16</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Layout.Sider>
      <Layout style={{ marginTop: 48, marginLeft: 200 }}>
        <Layout.Content style={{ padding: 24 }}>{props.children}</Layout.Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default connect((state: { userInfo: UserInfoState }) => ({
  uid: state.userInfo.uid
}))(ConfigLayout);
