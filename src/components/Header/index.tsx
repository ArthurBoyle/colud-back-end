import React from 'react';
import { useDispatch } from 'umi';
import { Modal } from 'antd';
import style from './index.less';

interface IProps {
  uid: string;
}

const Header: React.FC<IProps> = (props) => {
  const { uid } = props;

  const dispatch = useDispatch();

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
      <span>欢迎您，用户{uid}</span>
      <span className="iconfont icon-iconfonticon2" onClick={handleExit} />
    </div>
  );
};

export default Header;
