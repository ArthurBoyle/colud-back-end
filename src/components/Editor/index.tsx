import React, { forwardRef, useEffect } from 'react';
import { request } from 'umi';
import WangEditor from '@/assets/wangEditor/wangEditor.min.js';

interface IProps {
  sid: string;
  get: string;
}

const Editor = forwardRef((props: IProps, ref: any) => {
  const { sid, get } = props;

  useEffect(() => {
    // 创建实例
    ref.current = new WangEditor(ref.current);

    // 编辑器配置
    ref.current.config.height = 513;
    ref.current.config.zIndex = 1;
    ref.current.config.customUploadImg = async function (
      resultFiles: any,
      insertImgFn: (url: string) => void
    ) {
      // resultFiles 是 input 中选中的文件列表
      // insertImgFn 是获取图片 url 后，插入到编辑器的方法
      const formData = new FormData();
      formData.append('upfile', resultFiles[0]);
      const data = await request('api/static/ueditor/php/controller.php?action=uploadimage', {
        method: 'post',
        requestType: 'form',
        data: formData
      });
      // 上传图片，返回结果，将图片插入到编辑器中
      insertImgFn(data.url);
    };
    ref.current.config.uploadImgMaxSize = 20 * 1024 * 1024; // 2M

    // 创建编辑器
    ref.current.create();

    (async function () {
      const { code } = await request(`api/admin/System/${get}`, {
        method: 'post',
        data: { sid }
      });
      ref.current.txt.html(code);
    })();
  }, [get, ref, sid]);

  return <div ref={ref} />;
});

export default Editor;
