import React, { useRef } from 'react';
import { Popover } from 'antd';
import mobilePhone from '@/assets/images/mobilePhone.png';
import phone from '@/assets/images/phone.png';
import e_mail from '@/assets/images/email.png';
import style from './index.less';

const Footer: React.FC = () => {
  const ref1 = useRef<any>();
  const ref2 = useRef<any>();

  const contactUs = (
    <div className={style.content}>
      <div>
        <img src={mobilePhone} alt="" className={style.phone} />
        <span className={`${style.text} ${style.textPhone}`}>0371-56001150</span>
      </div>
      <div>
        <img src={phone} alt="" className={style.phone} />
        <span className={`${style.text} ${style.textPhone}`}>13101713637</span>
      </div>
      <div>
        <img src={e_mail} alt="" className={style.eMail} />
        <span className={`${style.text} ${style.textEMali}`}>zyf@hnxsj.ltd</span>
      </div>
    </div>
  );

  const weChat = (
    <div className={style.content}>
      <div>官方微信公众号</div>
      <img
        src="https://db.hnxsj.vip/image/default/4691FBD5FFC2481BAB5B5E5CCD0BB7E7-6-2.jpg"
        alt=""
      />
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
          <span className="iconfont icon-lianxi11" ref={ref1} />
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
            ref2.current.className = 'iconfont icon-weixin21';
            ref2.current.style.border = '1px solid rgba(255, 255, 255, 0)';
            ref2.current.style.backgroundColor = '#04d86a';
          } else {
            ref2.current.className = 'iconfont icon-weixin1';
            ref2.current.style.border = '1px solid rgba(255, 255, 255, 0.5)';
            ref2.current.style.backgroundColor = 'rgba(0,0,0,0)';
          }
        }}
      >
        <div className={style.img}>
          <span className="iconfont icon-weixin1" ref={ref2} />
        </div>
        <div className={style.text}>
          <div>微信</div>
          <div>公众号</div>
        </div>
      </Popover>
    </div>
  );
};

export default Footer;
