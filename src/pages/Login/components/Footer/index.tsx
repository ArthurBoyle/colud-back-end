import React, { useRef } from 'react';
import style from './index.less';

const Footer: React.FC = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  return (
    <div className={style.container}>
      <i className={`iconfont iconlianxi11 ${style.img1}`} ref={ref1} />
      <div className={style.text1}>联系我们</div>

      <i className={`iconfont iconweixin1 ${style.img2}`} ref={ref2} />
      <div className={style.text2}>
        <div>微信</div>
        <div style={{ width: 36, position: 'relative', right: 2 }}>公众号</div>
      </div>
    </div>
  );
};

export default React.memo(Footer);
