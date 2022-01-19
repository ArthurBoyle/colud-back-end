import React from 'react';
import { connect, history, Dispatch } from 'umi';
import { Modal, Button, Popover } from 'antd';
import Content from '@/components/Header/content';
import { State } from '@/models/userInfo';
import style from './index.less';

interface IProps {
  dispatch: Dispatch;
  uid: string;
  sid: string;
  isListPage?: boolean;
}

interface IState {
  userInfo: State;
}

const Header: React.FC<IProps> = (props) => {
  const { dispatch, uid, sid, isListPage = false } = props;

  const handleExit = () => {
    Modal.confirm({
      title: '退出',
      content: '确定退出当前用户？',
      onOk: () => {
        dispatch({
          type: 'userInfo/clearUserInfo'
        });
      }
    });
  };

  return (
    <div className={style.header}>
      {!isListPage && (
        <span>
          <Button
            onClick={() => {
              history.push('/live-list');
            }}
          >
            直播列表
          </Button>
          <Popover content={<Content sid={sid} />} trigger="hover">
            <Button>观看地址</Button>
          </Popover>
        </span>
      )}
      <span>欢迎您，用户{uid}</span>
      <span className="iconfont icon-iconfonticon2" title="退出" onClick={handleExit} />
    </div>
  );
};

export default connect(({ userInfo }: IState) => ({
  sid: userInfo.sid
}))(Header);
