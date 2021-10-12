import React from 'react';
import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;

const LiveList: React.FC = () => {
  return (
    <Layout>
      <Header>Header</Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default LiveList;
