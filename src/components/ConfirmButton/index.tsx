import React from 'react';
import { Button } from 'antd';

interface IProps {
  onClick: () => void;
  loading: boolean;
}

const ConfirmButton: React.FC<IProps> = (props) => {
  const { onClick, loading } = props;
  return (
    <Button type="primary" onClick={onClick} loading={loading}>
      确认
    </Button>
  );
};

export default ConfirmButton;
