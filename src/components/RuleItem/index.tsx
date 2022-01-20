import React from 'react';
import { Form } from 'antd';

interface IProps {
  label: string;
  name: string;
  children: any;
}

const RuleItem: React.FC<IProps> = (props: any) => {
  const { label, name, children } = props;

  return (
    <Form.Item
      label={label}
      name={name}
      validateFirst
      rules={[
        { type: 'number', min: 0, message: '不能小于0' },
        { pattern: /^([0-9]*)$/, message: '请输入整数' }
      ]}
    >
      {children}
    </Form.Item>
  );
};

export default RuleItem;
