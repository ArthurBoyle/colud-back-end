import { request } from 'umi';
import { Button } from 'antd';
import styles from './index.less';

export default function IndexPage() {
  const login = async () => {
    const data = await request('api/admin/Login/login', {
      method: 'post',
      data: { mobile: 'jy588vip', pwd: '78pteum0p' }
    });
    window.localStorage.setItem('user', data.data.id);
  };

  const isMobile = () => {
    const agent = navigator.userAgent;
    const mobileAgents = [
      'Android',
      'iPhone',
      'Symbian',
      'WindowsPhone',
      'iPod',
      'BlackBerry',
      'Windows CE'
    ];

    const result = mobileAgents.some((item) => {
      console.log(item);
      console.log(agent.indexOf(item) > -1);
      return agent.indexOf(item) > -1;
    });

    alert(result);
  };

  const getInfo = () => {
    if (!window.localStorage) {
      alert('浏览器不支持localstorage');
      return false;
    } else {
      //主逻辑业务
      const user = window.localStorage.getItem('user');
      console.log(user);
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Button onClick={login}>登录</Button>
      <Button onClick={getInfo}>获取信息</Button>
      <Button onClick={isMobile}>是否是移动端</Button>
    </div>
  );
}
