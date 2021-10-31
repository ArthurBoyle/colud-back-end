const Routes = [
  {
    path: '/',
    component: '@/layouts/BaseLayout',
    routes: [
      {
        title: '登录',
        path: '/login',
        component: '@/pages/Login'
      },
      {
        title: '直播列表',
        path: '/liveList',
        component: '@/pages/LiveList'
      },
      {
        title: '首页',
        path: '/',
        component: '@/pages/index'
      }
      /*{
        path: '/no/auth',
        pageName: '无权限',
        component: '@/pages/NoAuth'
      },
      {
        path: '/no/found/page',
        pageName: '404',
        component: '@/pages/404'
      }*/
    ]
  }
];

export default Routes;
