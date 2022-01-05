import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/es/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index';

const Index = generatePicker<Dayjs>(dayjsGenerateConfig);

interface IProps {
  value?: string;
  onChange?: (value: string | null) => void;
}

const DateTimeSelect: React.FC<IProps> = (props) => {
  const { value, onChange } = props;

  const onChangeHandle = (date: Dayjs | null, dateString: string) => {
    if (dateString) {
      onChange?.(dateString);
    } else {
      onChange?.(null);
    }
  };

  return <Index showTime value={value ? dayjs(value) : null} onChange={onChangeHandle} />;
};

export default DateTimeSelect;
