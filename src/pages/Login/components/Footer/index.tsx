import React, { useRef } from 'react';
import { Popover } from 'antd';
import mobilePhone from '@/assets/images/mobilePhone.png';
import phone from '@/assets/images/phone.png';
import e_mail from '@/assets/images/email.png';
import weChatPng from '@/assets/images/weChat.png';
import style from './index.less';

const Footer: React.FC = () => {
  const ref1: any = useRef();
  const ref2: any = useRef();

  const contactUs = (
    <div className={style.content}>
      <div>
        <img src={mobilePhone} alt="" className={style.phone} />
        <span className={`${style.text} ${style.textPhone}`}>400-0568-000</span>
      </div>
      <div>
        <img src={phone} alt="" className={style.phone} />
        <span className={`${style.text} ${style.textPhone}`}>010-64813450</span>
      </div>
      <div>
        <img src={e_mail} alt="" className={style.eMail} />
        <span className={`${style.text} ${style.textEMali}`}>hr@weiboyi.com</span>
      </div>
    </div>
  );

  const weChat = (
    <div className={style.content}>
      <div>官方微信公众号</div>
      <img src={weChatPng} alt="" />
    </div>
  );

  return (
    <div className={style.container}>
      <Popover
        className={style.contactUs}
        placement="leftTop"
        content={contactUs}
        getPopupContainer={(triggerNode) => triggerNode}
        onVisibleChange={(visible) => {
          if (visible) {
            ref1.current.style.border = '1px solid rgba(255, 255, 255, 0)';
            ref1.current.style.backgroundColor = '#657EFF';
          } else {
            ref1.current.style.border = '1px solid rgba(255, 255, 255, 0.5)';
            ref1.current.style.backgroundColor = 'rgba(0,0,0,0)';
          }
        }}
      >
        <div className={style.img}>
          <i className="iconfont iconlianxi11" ref={ref1} />
        </div>
        <div className={style.text}>联系我们</div>
      </Popover>
      <Popover
        className={style.weChat}
        placement="leftBottom"
        content={weChat}
        getPopupContainer={(triggerNode) => triggerNode}
        onVisibleChange={(visible) => {
          if (visible) {
            ref2.current.className = 'iconfont iconweixin21';
            ref2.current.style.border = '1px solid rgba(255, 255, 255, 0)';
            ref2.current.style.backgroundColor = '#04d86a';
          } else {
            ref2.current.className = 'iconfont iconweixin1';
            ref2.current.style.border = '1px solid rgba(255, 255, 255, 0.5)';
            ref2.current.style.backgroundColor = 'rgba(0,0,0,0)';
          }
        }}
      >
        <div className={style.img}>
          <i className="iconfont iconweixin1" ref={ref2} />
        </div>
        <div className={style.text}>
          <div>微信</div>
          <div>公众号</div>
        </div>
      </Popover>
    </div>
  );
};

export default React.memo(Footer);
