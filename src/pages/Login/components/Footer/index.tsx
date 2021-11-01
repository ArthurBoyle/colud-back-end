import React, { useRef } from 'react';
import { Popover } from 'antd';
import style from './index.less';

const Footer: React.FC = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  return (
    <div className={style.container}>
      <Popover
        className={style.contactUs}
        placement="left"
        content={123}
        getPopupContainer={(triggerNode) => triggerNode}
      >
        <div className={style.contactUsImg}>
          <i className="iconfont iconlianxi11" ref={ref1} />
        </div>
        <div className={style.contactUsText}>联系我们</div>
      </Popover>

      <Popover
        className={style.weChat}
        placement="left"
        content={345}
        getPopupContainer={(triggerNode) => triggerNode}
      >
        <div className={style.wechatImg}>
          <i className="iconfont iconweixin1" ref={ref2} />
        </div>
        <div className={style.wechatText}>
          <div>微信</div>
          <div>公众号</div>
        </div>
      </Popover>
    </div>
  );
};

export default React.memo(Footer);
