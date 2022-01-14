import React, { useRef } from 'react';
import { connect, request } from 'umi';
import { useImmer } from 'use-immer';
import Editor from '@/components/Editor';
import Background from '@/components/Background';
import ConfirmButton from '@/components/ConfirmButton';
import { State } from '@/models/userInfo';

interface IProps {
  sid: string;
}

interface IState {
  userInfo: State;
}

const LiveDetail: React.FC<IProps> = (props) => {
  const { sid } = props;

  const editorRef = useRef<any>();

  const [saveLoading, setSaveLoading] = useImmer<boolean>(false);

  const handleSave = async () => {
    setSaveLoading(true);
    return request('api/admin/System/details', {
      method: 'post',
      data: { sid, code: editorRef.current.txt.html() }
    }).finally(() => {
      setSaveLoading(false);
    });
  };

  return (
    <Background>
      <div className="page_title">活动详情</div>
      <Editor sid={sid} get="get_details" ref={editorRef} />
      <ConfirmButton onClick={handleSave} loading={saveLoading} />
    </Background>
  );
};

export default connect(({ userInfo }: IState) => ({
  sid: userInfo.sid
}))(LiveDetail);
